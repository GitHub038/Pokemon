import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { PokemonService } from './pokemon/pokemon.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path:'', 
        canActivate: [authGuard],
        loadChildren: () => import('./pokemon/pokemon.routes')
    },
    { 
        path: 'login', 
        title: 'Login',
        loadComponent: () => import('./login/login.component').then(module => module.LoginComponent)},
    { 
        path: '**',
        title: 'Page not found', 
        loadComponent: () => import('./page-not-found/page-not-found.component').then(module => module.PageNotFoundComponent)},
];
