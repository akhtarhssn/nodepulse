'use client';

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const SubscriptionPage = () => {
  const trpc = useTRPC();
  const testPremium = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Successfully accessed premium resource!");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    }),
  );

  return (
    <Button onClick={() => testPremium.mutate()}>
      Test Premium Resource
    </Button>
  );
};

export default SubscriptionPage;
