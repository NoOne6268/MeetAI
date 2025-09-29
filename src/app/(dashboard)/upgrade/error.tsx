"use client";

import { ErrorState } from "@/components/error-state";

export default function ErrorPage() {
  return  <ErrorState title="Error Loading Upgrade Page" description="There was an error loading the upgrade page. Please try again later." />;
}
