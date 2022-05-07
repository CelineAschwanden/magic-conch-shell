import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule), ...canActivate(redirectLoggedInToHome) },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
