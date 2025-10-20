import {
  fetchPokemonDetail,
  fetchPokemons,
  fetchPostComments,
  fetchPosts,
} from "@/lib/api/api";

export const pokemonQueryOptions = {
  getPokemon: () => ({
    queryKey: ["pokemon"],
    queryFn: () => fetchPokemons(),
  }),
  getPokemonById: (id: string) => ({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemonDetail(id),
  }),
};

export const postQueryOptions = {
  getPosts: () => ({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  }),
  getPostComments: (postId: string) => ({
    queryKey: ["comments", postId],
    queryFn: () => fetchPostComments(postId),
  }),
};
