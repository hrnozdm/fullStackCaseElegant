import { Button } from "@/components/ui/button";
import type { Pokemon } from "@/lib/schema/pokemon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Link } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";

export function PokemonUrlCell({ row }: { row: Row<Pokemon> }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">...</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-gray-500 p-4 rounded-2xl" side="right">
        <div className="text-lg text-center font-bold">
          {row.original.name.toUpperCase()}
        </div>
        <div className="flex justify-center mt-4   bg-white p-2 rounded-2xl">
          <Link
            to="/pokemon/$pokemonId"
            params={{
              pokemonId:
                row.original.url.split("/").filter(Boolean).pop() ?? "1",
            }}
          >
            Detayları Görüntüle
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
