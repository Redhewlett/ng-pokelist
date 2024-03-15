import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonBaseInfo } from '../../interfaces/pokemon';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  @Input() pokemonWithInfo: PokemonBaseInfo[] | null = null;
}
