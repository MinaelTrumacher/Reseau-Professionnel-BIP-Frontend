import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// MATERIEL
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCommonModule } from '@angular/material/core';

// COMPONENTS
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ModalCguContentComponent } from './components/modal-cgu-content/modal-cgu-content.component';
import { ModalCguComponent } from './components/modal-cgu/modal-cgu.component';
import { FormloginComponent } from './components/form-login/form-login.component';
import { FormPwdComponent } from './components/form-pwd/form-pwd.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { GridComponent } from './components/grid/grid.component';
import { ConversationComponent } from './components/messagerie/conversation/conversation.component';
import { DetailsConversationComponent } from './components/messagerie/details-conversation/details-conversation.component';
import { DialogAjoutConversationComponent } from './components/messagerie/dialogs/dialog-ajout-conversation/dialog-ajout-conversation.component';
import { DialogMessagerieComponent } from './components/messagerie/dialogs/dialog-messagerie/dialog-messagerie.component';

//SERVICES
import { AuthenticationUserService } from './services/authentification-user.service';
import { UtilisateurService } from './services/utilisateur.service';
import { AuthGuard } from './services/auth-guard.service'

//HTTP
import { HttpClientModule } from '@angular/common/http';


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
    HeaderComponent,
    FooterComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    GridComponent,
    FormPwdComponent,
    MessagerieComponent,
    ConversationComponent,
    DetailsConversationComponent,
    DialogAjoutConversationComponent,
    DialogMessagerieComponent
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
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatCardModule,
    MatAutocompleteModule,
    MatCommonModule
  ],
  providers: [AuthenticationUserService, MatIconRegistry, MatDialog, UtilisateurService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
