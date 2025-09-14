"use client";

import { ErrorState } from "@/components/error-state";

export default function ErrorPage() {
  return  <ErrorState title="Error Loading Agents" description="There was an error loading the agents. Please try again later." />;
}
