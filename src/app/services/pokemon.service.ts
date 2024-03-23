import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  mergeMap,
  shareReplay,
  tap,
  toArray,
} from 'rxjs';
import { PokemonRessources } from '../interfaces/pokemon-ressources';
import { PokemonInfo, PokemonBaseInfo } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemonResources$ = this.getPokemon().pipe(shareReplay(1));

  public isLoading$ = new BehaviorSubject<boolean>(false);

  public pokemonWithInfo$: Observable<PokemonBaseInfo[]> =
      this.pokemonResources$.pipe(
        tap(() => this.isLoading$.next(true)), // set loading to true before the request
        mergeMap((res) => res.results),
        mergeMap((pokemon) =>
          this.http.get<PokemonInfo>(pokemon.url).pipe(
            map(
              (pokemonData: PokemonInfo): PokemonBaseInfo => ({
                name: pokemonData.name,
                id: pokemonData.id,
                weight: pokemonData.weight,
                sprites: pokemonData.sprites,
                // map other properties as needed
              })
            ),
            tap(() => this.isLoading$.next(false)), // set loading to false after each request
          )
        ),
        toArray(),
        catchError((error) => {
          this.isLoading$.next(false); // set loading to false if there is an error
          throw error;
        })
      );

  constructor(private http: HttpClient) {}

  public getPokemon(): Observable<PokemonRessources> {
    return this.http.get<PokemonRessources>(
      'https://pokeapi.co/api/v2/pokemon?limit=20'
    );
  }

  public getPokemonInfo(number: number): Observable<PokemonInfo> {
    return this.http.get<PokemonInfo>(
      `https://pokeapi.co/api/v2/pokemon/${number}`
    );
  }
  public updatePokemonResources(url: string): void {
    this.isLoading$.next(true); // set loading to true before the request
    this.pokemonResources$ = this.http.get<PokemonRessources>(url).pipe(
      shareReplay(1),
      tap(() => this.isLoading$.next(false)), // set loading to false after the request
      catchError((error) => {
        this.isLoading$.next(false); // set loading to false if there is an error
        throw error;
      })
    );
    this.pokemonWithInfo$ = this.pokemonResources$.pipe(
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
  }
}
