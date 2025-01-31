import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {
  message: string = "Vous êtes déconnecté. (pikachu/pikachu)";
  name: string; 
  password: string;
  auth: AuthService; 

  constructor(
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage() {
    if(this.auth.isLoggedIn) {
      this.message = 'Vous êtes connecté' 
    } else {
      this.message = 'Identifiant ou mot de passe incorrect'
    }
  }

  login() {
    this.message = "Tentative de connexion en cours..."
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if(isLoggedIn) {
          this.route.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.route.navigate(['/login']);
        }
      })
  }

  logout() {
    this.auth.logout();
    this.message = 'vous êtes déconnecté'
  }
}
