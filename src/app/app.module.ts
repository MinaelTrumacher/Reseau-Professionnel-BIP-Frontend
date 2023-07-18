import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

//Mat import
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';

//Components
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { ProfilComponent } from './components/profil/profil.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { ModalCguComponent } from './components/modal-cgu/modal-cgu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    IndexComponent,
    MessagerieComponent,
    ProfilComponent,
    InscriptionComponent,
    ModalCguComponent, 
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //Mat imports
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
