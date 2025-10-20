import type { PokemonMoves } from "@/lib/schema/pokemon";
import type { ColumnDef } from "@tanstack/react-table";

export const movesColumns: ColumnDef<PokemonMoves>[] = [
  {
    header: "Moves",
    accessorKey: "moves",
    cell: ({ row }) => {
      return (
        <div>{row.original.moves.map((move) => move.move.name).join(", ")}</div>
      );
    },
  },
];
