import { AgentIdView } from "@/agents/ui/agent-id-view";
import { LoadingState } from "@/components/loading-state";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ agentId: string }>;
}

export default async function Page({ params }: Props) {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agent..."
            description="Please wait while we fetch the agent."
          />
        }
      >
          <AgentIdView agentId={agentId} />
      </Suspense>
    </HydrationBoundary>
  );
}
