import { Component } from '@angular/core';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonSearchComponent } from '../../components/pokemon-search/pokemon-search.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PokemonListComponent, CommonModule , PokemonSearchComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(public pokemonService: PokemonService) {
  }
}
