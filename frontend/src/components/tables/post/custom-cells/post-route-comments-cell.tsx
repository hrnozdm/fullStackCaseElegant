import { Button } from "@/components/ui/button";
import type { postSchema } from "@/lib/schema/post";
import { Link } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import type z from "zod";

export function PostRouteCommentsCell({
  row,
}: {
  row: Row<z.infer<typeof postSchema>>;
}) {
  return (
    <Button variant="outline" asChild>
      <Link to="/posts/$postId" params={{ postId: row.original.id.toString() }}>
        Comments
      </Link>
    </Button>
  );
}
