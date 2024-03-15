export interface PokemonBaseInfo {
  id: number;
  name: string;
  weight: number;
  sprites: {
    front_default: string;
  };
}

export interface PokemonInfo {
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string
  };
  weight: number;
}
