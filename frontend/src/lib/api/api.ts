import axios from "axios";
import { pokemonDetailSchema, pokemonListSchema } from "@/lib/schema/pokemon";
import { commentSchema, postSchema } from "@/lib/schema/post";

export async function fetchPokemons() {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  );

  const parsedData = pokemonListSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid response from API");
  }
  return parsedData.data.results;
}

export async function fetchPokemonDetail(pokemonId: string) {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const parsedData = pokemonDetailSchema.safeParse(data);
  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new Error("Invalid response from API");
  }

  return parsedData.data;
}

export async function fetchPosts() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const parsedData = postSchema.array().safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid response from API");
  }
  return parsedData.data;
}

export async function fetchPostComments(postId: string) {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  const parsedData = commentSchema.array().safeParse(data);
  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new Error("Invalid response from API");
  }
  return parsedData.data;
}




const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_info");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const apiInstances = [api];

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem("auth_token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("auth_token");
    delete api.defaults.headers.common["Authorization"];
  }
}
