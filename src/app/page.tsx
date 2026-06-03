import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ClientComponent from "./client";
import { Suspense } from "react";

const Home = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <main className="flex items-center justify-center min-h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <ClientComponent />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
};

export default Home;
