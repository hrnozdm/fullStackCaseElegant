import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/pokemon")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <h1>Pokemon Layout</h1>
    </>
  );
}
