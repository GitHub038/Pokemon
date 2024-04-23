import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  // "Subject represente un flux de données avec les recherches de l'utilisateur :
  // {..."a".."ab"..."abz".."ab"..."abc"}
  // La diff entre Subject et un Observable c'est que ce dernier on peut que le consommer
  searchTerms = new Subject<string>(); 
  pokemons$: Observable<Pokemon[]>

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {

  }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"..."abz"."ab"...."abc"......}
      debounceTime(300), //on attends 300ms avant de lancer la recherche de l'utilisateur
      // {"ab"...."ab"...."abc"......}
      distinctUntilChanged(), // pour éliminer les recherches doubles
      // {......"ab"........."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term)) // map transforme en Observable, swithMap renvoie la liste
      // {......Obervable<"ab">.........Obervable<"abc">......} // map
      // {......pokemonList(ab).........pokemonList(abc)......} // switchMap
      // concatMap / mergeMap / switchMap
    )
  }
  
  search(term: string) {
    this.searchTerms.next(term) // next équivaut à "push" mais pour un flux de données; on pousse chaque terme de recherches
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id]
    this.router.navigate(link)
  }
}
