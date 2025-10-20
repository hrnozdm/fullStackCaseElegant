import { z } from "zod";

export const pokemonSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;

export const pokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonSchema),
});

export type PokemonList = z.infer<typeof pokemonListSchema>;

export const pokemonDetailSchema = z.object({
  abilities: z
    .array(
      z.object({
        ability: z
          .object({
            name: z.string().optional(),
            url: z.string().optional(),
          })
          .optional(),
        is_hidden: z.boolean().optional(),
        slot: z.number().optional(),
      })
    )
    .optional(),
  base_experience: z.number().optional(),
  cries: z
    .object({
      latest: z.string().optional(),
      legacy: z.string().optional(),
    })
    .optional(),
  forms: z
    .array(
      z.object({
        name: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
  game_indices: z.array(z.any()).optional(),
  height: z.number().optional(),
  held_items: z
    .array(
      z.object({
        name: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
  id: z.number().optional(),
  is_default: z.boolean().optional(),
  location_area_encounters: z.string().optional(),
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
        url: z.string(),
      }),
      version_group_details: z.array(
        z.object({
          level_learned_at: z.number(),
          move_learn_method: z.object({
            name: z.string(),
            url: z.string(),
          }),
          order: z.number().nullable(),
          version_group: z.object({
            name: z.string(),
            url: z.string(),
          }),
        })
      ),
    })
  ),
  name: z.string().optional(),
});

export type PokemonDetail = z.infer<typeof pokemonDetailSchema>;

export const pokemonMovesSchema = z.object({
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
});

export type PokemonMoves = z.infer<typeof pokemonMovesSchema>;
