import { Component, Input } from '@angular/core';
import { PokemonInfo } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon: PokemonInfo | undefined;
}
