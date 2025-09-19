import { ListHeader } from "@/agents/ui/list-header";
import { AgentsView } from "@/agents/views/agents-view";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Agents..."
              description="Please wait while we fetch the agents."
            />
          }
        >
          <AgentsView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
