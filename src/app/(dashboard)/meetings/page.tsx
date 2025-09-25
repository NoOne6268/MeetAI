import { LoadingState } from "@/components/loading-state";
import { MeetingsView } from "@/meetings/ui/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Meetings..."
            description="Please wait while we fetch the meetings."
          />
        }
      >
        <MeetingsView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
