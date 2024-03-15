import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonBaseInfo } from '../../interfaces/pokemon';
import { RouterLink } from '@angular/router';
import { PaginatiorComponent } from '../paginatior/paginatior.component';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule , RouterLink, PaginatiorComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  @Input() pokemonWithInfo: PokemonBaseInfo[] | null = null;
}
