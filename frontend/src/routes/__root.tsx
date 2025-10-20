import { Header } from "@/components/header";
import { Spinner } from "@/components/Spinner";
import type { TestContext } from "@/context/test-context";
import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return <Spinner show={isLoading} />;
}

interface RootContext {
  queryClient: QueryClient;
  testContext: TestContext;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Header />
      <RouterSpinner />
      <Outlet />
    </>
  );
}
