import { postColumns } from "@/components/tables/post/columns";
import { Loader } from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { GlobalDataTable } from "@/components/tables/shared/global-data-table";
import { postQueryOptions } from "@/hooks/query-options";

export const Route = createFileRoute("/(app)/posts/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(postQueryOptions.getPosts());
  },
});

function RouteComponent() {
  const { data, isLoading, isError, error } = useQuery(
    postQueryOptions.getPosts()
  );

  if (isLoading) return <Loader />;
  if (isError) return <p>Hata: {error?.message}</p>;

  return (
    <GlobalDataTable
      columns={postColumns}
      data={data ?? []}
      filterColumn="title"
    />
  );
}
