import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { PokemonService } from '../pokemon.service';
import { LoaderComponent } from '../loader/loader.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [NgIf, NgFor, PokemonTypeColorPipe, LoaderComponent, DatePipe],
  templateUrl: './detail-pokemon.component.html',
  styles: ``
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon|undefined; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonService: PokemonService,
    private title: Title
  ) {}
  
  ngOnInit(): void {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');

    if(pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => 
      {
        this.pokemon = pokemon;
        this.initTitle(pokemon);
      });
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }

  goToPokemonList() {
     this.router.navigate(['/pokemons'])
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id])
  }

  initTitle(pokemon: Pokemon | undefined) {
    if (!pokemon) {
      this.title.setTitle('Pokemon not found');
      return;
    }
  
    this.title.setTitle(pokemon.name)
   }
}
