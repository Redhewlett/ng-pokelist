import { Component, Input } from '@angular/core';
import { PokemonRessource, PokemonRessources } from '../../interfaces/pokemon-ressources';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  @Input() pokemonResources: PokemonRessources | null = null;

}
