import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';

import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalCguContentComponent } from './components/modal-cgu-content/modal-cgu-content.component';
import { ModalCguComponent } from './components/modal-cgu/modal-cgu.component';
import { FormloginComponent } from './components/form-login/form-login.component';
import { FormMdpComponent } from './components/form-mdp/form-mdp.component';
import { AuthenticationUserService } from './services/authentification-user.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UtilisateurService } from './services/utilisateur.service';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    MessagerieComponent,
    ProfilComponent,
    ContactFormComponent,
    InscriptionComponent,
    ModalCguContentComponent,
    ModalCguComponent,
    FormloginComponent,
    FormMdpComponent,
    HeaderComponent,
    FooterComponent,
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    //Mat imports
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [AuthenticationUserService, MatIconRegistry, MatDialog, UtilisateurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
