import { pokemonColumns } from "@/components/tables/pokemon/columns";
import { PokemonDataTable } from "@/components/tables/pokemon/data-table";
import { pokemonQueryOptions } from "@/hooks/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/pokemon/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(pokemonQueryOptions.getPokemon());
  },
});

function RouteComponent() {
  const { data } = useSuspenseQuery(pokemonQueryOptions.getPokemon());

  return (
    <PokemonDataTable
      columns={pokemonColumns}
      data={data ?? []}
      filterColumn="name"
      enableView={false}
      enableSelect={false}
    />
  );
}
