import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProfilComponent } from './components/profil/profil.component';
import { SearchComponent } from './components/search/search.component';
import { UnauthGuardGuard } from './services/unauth-guard.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuardGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/index' },
      { path: 'index', component: IndexComponent }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent },
      { path: 'messagerie', component: MessagerieComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'search', component: SearchComponent }
    ]
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
