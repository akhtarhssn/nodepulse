"use client";

import LogOutButton from "@/components/LogOutButton";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Home = () => {
  // await requireAuth();

  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const createWorkflowMutation = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        toast.success("Workflow creation initiated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const testAiMutation = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI test initiated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-10">
        {/* <p>Protected content. Welcome, {data[0]?.email ?? "User"}!</p> */}
        <span>Protected server component</span>
        <div className="">
          {isLoading ? "Loading..." : JSON.stringify(data ?? [], null, 2)}
        </div>

        <Button
          onClick={() => testAiMutation.mutate()}
          disabled={testAiMutation.isPending}
        >
          {testAiMutation.isPending ? "Testing..." : "Test AI"}
        </Button>

        <Button
          onClick={() => createWorkflowMutation.mutate()}
          disabled={createWorkflowMutation.isPending}
        >
          {createWorkflowMutation.isPending ? "Creating..." : "Create Workflow"}
        </Button>
        {/* {createWorkflowMutation.isSuccess && (
          <p className="text-sm text-green-500">
            Created: {createWorkflowMutation.data.name} (
            {createWorkflowMutation.data.id})
          </p>
        )} */}
        <LogOutButton />
      </div>
    </main>
  );
};

export default Home;
