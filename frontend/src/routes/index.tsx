import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { FileRoutesByTo } from "@/routeTree.gen";

export const Route = createFileRoute("/")({
  component: App,
});

type NavigationLink = { to: keyof FileRoutesByTo; label: string };

const navigationLinks: NavigationLink[] = [
  {to:"/",label:"Home"}
];

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="flex gap-6">
        {navigationLinks.map((link) => (
          <Button asChild size="lg" key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
