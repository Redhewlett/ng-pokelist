export interface PokemonRessources {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonRessource[];
}

export interface PokemonRessource {
  name: string;
  url: string;
}
