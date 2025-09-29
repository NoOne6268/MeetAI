import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { UpgradeView } from "@/premium/ui/upgrade-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );
  void queryClient.prefetchQuery(trpc.premium.getProducts.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading..."
            description="This may take a moment."
          />
        }
      >
        <UpgradeView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
