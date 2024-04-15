import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon|undefined; 

  ngOnInit(): void {
    console.table(this.pokemonList);
  }

  selectPokemon(pokemonId: string) {
    const pokemon : Pokemon | undefined= this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
    if(pokemon) {
      console.log(`Vous avez cliqué sur le pokémon ${pokemon?.name}`);
      this.pokemonSelected = pokemon
    } else {
      console.log(`Vous avez cliqué sur un pokémon qui n'existe pas`);
      this.pokemonSelected = pokemon
    }

  }
}
