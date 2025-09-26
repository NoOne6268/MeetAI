"use client";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdViewHeader } from "./meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/agents/hooks/use-confirm";
import { UpdateMeetingDialog } from "./update-meeting-dialog";
import { useState } from "react";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting."
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // TODO: Invalidate free tier usage
        router.push("/meetings");
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const confirmed = await confirmRemove();
    if (confirmed) {
      removeMeeting.mutateAsync({ id: meetingId });
    }
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col -gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data?.name || "Loading..."}
          onEdit={() => {}}
          onRemove={handleRemoveMeeting}
        />
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
};
