import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
  { path: '**', redirectTo: '' }
];
