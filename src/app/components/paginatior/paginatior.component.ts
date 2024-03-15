import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PokemonService } from '../../services/pokemon.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-paginatior',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
  templateUrl: './paginatior.component.html',
  styleUrl: './paginatior.component.scss',
})
export class PaginatiorComponent {
  public totalPokemons$ = this.pokemonService.pokemonResources$.pipe(
    map((res) => res.count)
  );
  constructor(private pokemonService: PokemonService) {}

  onPageChange(event: any) {
    this.pokemonService.updatePokemonResources(
      `https://pokeapi.co/api/v2/pokemon?limit=${event.pageSize}&offset=${
        event.pageIndex * event.pageSize
      }`
    );
  }
}
