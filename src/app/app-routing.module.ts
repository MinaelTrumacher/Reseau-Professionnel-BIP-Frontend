import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { ProfilComponent } from './components/profil/profil.component';
import { GridComponent } from './components/grid/grid.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'messagerie',
    component: MessagerieComponent
  },
  { 
    path: 'profil',
    component: ProfilComponent
    },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
