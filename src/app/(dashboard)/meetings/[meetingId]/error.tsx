"use client";

import { ErrorState } from "@/components/error-state";

export default function ErrorPage() {
  return  <ErrorState title="Error Loading Meeting" description="There was an error loading the meeting. Please try again later." />;
}
