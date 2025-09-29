import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { MeetingIdView } from "@/meetings/ui/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Meeting..."
            description="Please wait while we fetch the meeting."
          />
        }
      >
        <MeetingIdView meetingId={meetingId} />
      </Suspense>
    </HydrationBoundary>
  );
};
