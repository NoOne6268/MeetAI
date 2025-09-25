"use client";

import { ErrorState } from "@/components/error-state";

export default function ErrorPage() {
  return  <ErrorState title="Error Loading Meetings" description="There was an error loading the meetings. Please try again later." />;
}
