// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Pokemon } from "./types";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<
      any,
      { foo: string; bar: string; account: any }
    >({
      query: ({ foo, bar, account }) => {
        console.log(account);
        return `pokemon/${foo}`;
      },
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
