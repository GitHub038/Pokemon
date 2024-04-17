import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BorderCardDirective } from './pokemon/border-card.directive';
import { PokemonTypeColorPipe } from './pokemon/pokemon-type-color.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BorderCardDirective, PokemonTypeColorPipe],
  templateUrl: 'app.component.html'
})
export class AppComponent {}
