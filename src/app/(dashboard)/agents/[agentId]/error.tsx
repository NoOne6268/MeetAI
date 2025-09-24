"use client";

import { ErrorState } from "@/components/error-state";

export default function ErrorPage() {
  return  <ErrorState title="Error Loading Agent" description="There was an error loading the agent. Please try again later." />;
}
