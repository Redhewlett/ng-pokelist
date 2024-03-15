import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, shareReplay, toArray } from 'rxjs';
import { PokemonRessources } from '../interfaces/pokemon-ressources';
import { PokemonInfo, PokemonBaseInfo } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemonResources$ = this.getPokemon().pipe(shareReplay(1));

  public pokemonWithInfo$: Observable<PokemonBaseInfo[]> =
    this.pokemonResources$.pipe(
      mergeMap((res) => res.results),
      mergeMap((pokemon) => this.http.get<PokemonInfo>(pokemon.url)),
      map(
        (pokemonData: PokemonInfo): PokemonBaseInfo => ({
          name: pokemonData.name,
          id: pokemonData.id,
          weight: pokemonData.weight,
          sprites: pokemonData.sprites,
          // map other properties as needed
        })
      ),
      toArray()
    );

  constructor(private http: HttpClient) {}

  public getPokemon(): Observable<PokemonRessources> {
    return this.http.get<PokemonRessources>(
      'https://pokeapi.co/api/v2/pokemon?limit=20'
    );
  }

  public getNextPokemonPage(url: string): Observable<PokemonRessources> {
    return this.http.get<PokemonRessources>(url);
  }

  public getPokemonInfo(number:number): Observable<PokemonInfo> {
    return this.http.get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${number}`);
  }
}
