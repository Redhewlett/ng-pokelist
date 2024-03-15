import { Component } from '@angular/core';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PokemonListComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(public pokemonService: PokemonService) {
  }
}
