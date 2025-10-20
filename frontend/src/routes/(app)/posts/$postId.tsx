import { Loader } from "@/components/loader";
import { postDetailCommentColumns } from "@/components/tables/post-detail-comment/column";
import { GlobalDataTable } from "@/components/tables/shared/global-data-table";
import { postQueryOptions } from "@/hooks/query-options";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/posts/$postId")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      postQueryOptions.getPostComments(params.postId)
    );
  },
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const { data, isLoading, isError, error } = useQuery(
    postQueryOptions.getPostComments(postId)
  );

  if (isLoading) return <Loader />;
  if (isError) return <p>Hata: {error?.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post Comments {postId}</h1>
      <GlobalDataTable
        columns={postDetailCommentColumns}
        data={data ?? []}
        enableView={false}
      />
    </div>
  );
}
