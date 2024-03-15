import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { PokemonRessources } from '../interfaces/pokemon-ressources';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemonResources$ = this.getPokemon().pipe
    (shareReplay(1));

  constructor(private http: HttpClient) {}

  public getPokemon(): Observable<PokemonRessources> {
    return this.http.get<PokemonRessources>(
      'https://pokeapi.co/api/v2/pokemon?limit=20'
    );
  }

  public getNextPokemonPage(url: string): Observable<PokemonRessources>{
    return this.http.get<PokemonRessources>(url);
  }
}
