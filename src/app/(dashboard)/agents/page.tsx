import { AgentsView } from "@/agents/views/agents-view";
import { LoadingState } from "@/components/loading-state";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Page() {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<LoadingState title="Loading Agents..." description="Please wait while we fetch the agents." />}>
      <AgentsView />
    </Suspense>
  </HydrationBoundary>;
}