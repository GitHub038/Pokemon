import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
//      tap((pokemonList) => console.table(pokemonList)), // tap = console.log pour un Observable
      tap((response)=>this.log(response)), // tap = console.log pour un Observable
      /* catchError((error) => {
          console.log(error);
          return of([]); // transforme une donnée simple en Observable
        })*/
      catchError((error) => this.handleError(error, [])) 
    ); 
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemon/${pokemonId}`).pipe(
      tap((response)=>this.log(response)), // tap = console.log pour un Observable
      catchError((error) => this.handleError(error, undefined))
    );
  }

  //updatePokemon(pokemon: Pokemon): Observable<Pokemon|undefined> {
  updatePokemon(pokemon: Pokemon): Observable<null> { // que ca fonctionne ou pas le update renvoi null
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }; 

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  addPokemon(pokemon: Pokemon) : Observable<Pokemon> {
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }; 

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  deletePokemonById (pokemonId: number) : Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  private log(response: any) {
   console.table(response);
  }

  private handleError (error: Error, errorValue: any ) {
   console.error(error);
   return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte', 
      'Normal', 
      'Electrik', 
      'Poison', 
      'Fée', 
      'Vol', 
      'Combat', 
      "Psy"
    ];
  }
}
