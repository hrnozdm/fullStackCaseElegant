import { Header } from "@/components/header";
import { Spinner } from "@/components/Spinner";
import type { AuthContextType } from "@/context/auth-context";
import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return <Spinner show={isLoading} />;
}

interface RootContext {
  queryClient: QueryClient;
  auth: AuthContextType;
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
      <Toaster position="bottom-right" richColors />
    </>
  );
}
