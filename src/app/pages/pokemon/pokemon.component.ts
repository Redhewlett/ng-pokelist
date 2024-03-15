import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonInfo } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  public pokemon: PokemonInfo | undefined;
  constructor(private router: ActivatedRoute, private pokemonService: PokemonService) {
    // using the number in the url to get the pokemon info
    const id = this.router.snapshot.params['id']
    if(!id) return
    this.pokemonService.getPokemonInfo(id).subscribe((data) => {
      this.pokemon = data
    })
  }
}
