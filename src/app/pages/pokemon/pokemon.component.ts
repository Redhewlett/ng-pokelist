import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonInfo } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  public pokemon: PokemonInfo | undefined;

  constructor(private router: ActivatedRoute, private pokemonService: PokemonService) {
    const id = this.router.snapshot.params['id']
    if(!id) return
    this.pokemonService.getPokemonInfo(id).subscribe((data) => {
      this.pokemon = data
    })
    // clear the search input when we navigate to the pokemon page
    this.pokemonService.searchControl.setValue(null)
  }
}
