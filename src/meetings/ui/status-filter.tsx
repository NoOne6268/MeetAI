import {
  CircleXIcon,
  CircleCheckIcon,
  CircleArrowUpIcon,
  VideoIcon,
  LoaderIcon,
} from "lucide-react";
import { CommandSelect } from "@/components/command-select";
import { MeetingStatus } from "../types";
import { useMeetingsFilters } from "@/meetings/hooks/use-meetings-filters";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filter, setFilter] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Status"
      options={options}
      className="h-9"
      onSelect={(value) => setFilter({ status: value as MeetingStatus })}
      value={filter.status ?? ""}
    />
  );
};
