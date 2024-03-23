import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  debounce,
  debounceTime,
  forkJoin,
  map,
  mergeMap,
  shareReplay,
  startWith,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import {
  PokemonRessource,
  PokemonRessources,
} from '../interfaces/pokemon-ressources';
import { PokemonInfo, PokemonBaseInfo } from '../interfaces/pokemon';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public searchControl = new FormControl('');
  public pokemonResources$ = this.getPokemon().pipe(shareReplay(1));

  public isLoading$ = new BehaviorSubject<boolean>(false);
  public pokemonFullList$: Observable<PokemonRessource[]> =
    this.getFullList().pipe(shareReplay(1));

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
          tap(() => this.isLoading$.next(false)) // set loading to false after each request
        )
      ),
      toArray(),
      catchError((error) => {
        this.isLoading$.next(false); // set loading to false if there is an error
        throw error;
      })
    );
  // this reeeeeaaaaly needs to be optimized
  // since the search also fetchs the data from the api
  // it would be better to fetch all the data  when arriving and then filter it
  public filteredPokemonWithInfo$: Observable<PokemonBaseInfo[]> =
    combineLatest([
      this.pokemonFullList$,
      this.searchControl.valueChanges.pipe(startWith(''), debounceTime(300)),
    ]).pipe(
      map(([pokemonList, searchTerm]) => {
        if (!searchTerm) {
          return pokemonList;
        }
        return pokemonList.filter((pokemon) =>
          pokemon.name.includes(searchTerm)
        );
      }),
      mergeMap((pokemonList) =>
        forkJoin(
          pokemonList.map((pokemon) =>
            this.http.get<PokemonInfo>(pokemon.url).pipe(
              map(
                (pokemonData: PokemonInfo): PokemonBaseInfo => ({
                  name: pokemonData.name,
                  id: pokemonData.id,
                  weight: pokemonData.weight,
                  sprites: pokemonData.sprites,
                  // map other properties as needed
                })
              )
            )
          )
        )
      )
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
  // can refactor this to use be used by both getPokemon and updatePokemonResources
  public getFullList(): Observable<PokemonRessource[]> {
    return this.http
      .get<PokemonRessources>('https://pokeapi.co/api/v2/pokemon?limit=1302')
      .pipe(map((res) => res.results));
  }

  public returnPokemonByName(name: string): Observable<PokemonBaseInfo> {
    return this.pokemonFullList$.pipe(
      map((pokemonList) =>
        pokemonList.find((pokemon) => pokemon.name === name)
      ),
      mergeMap((pokemon) => {
        if (!pokemon) {
          return throwError(`Pokemon with name ${name} not found`);
        }
        return this.http.get<PokemonInfo>(pokemon.url);
      }),
      map(
        (pokemonData: PokemonInfo): PokemonBaseInfo => ({
          name: pokemonData.name,
          id: pokemonData.id,
          weight: pokemonData.weight,
          sprites: pokemonData.sprites,
        })
      )
    );
  }
}
