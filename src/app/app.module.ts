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
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

// COMPONENTS
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FormContactComponent } from './components/form-contact/form-contact.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { CguDialogComponent } from './components/cgu-dialog/cgu-dialog.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormPwdComponent } from './components/form-pwd/form-pwd.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConversationComponent } from './components/messagerie/conversation/conversation.component';
import { DetailsConversationComponent } from './components/messagerie/details-conversation/details-conversation.component';
import { DialogAjoutConversationComponent } from './components/messagerie/dialogs/dialog-ajout-conversation/dialog-ajout-conversation.component';
import { DialogMessagerieComponent } from './components/messagerie/dialogs/dialog-messagerie/dialog-messagerie.component';
import { CreditsDialogComponent } from './components/credits-dialog/credits-dialog.component';
import { MentionsLegalesDialogComponent } from './components/mentions-legal-dialog/mentions-legal-dialog.component';
import { ProtectionDesDonneesDialogComponent } from './components/protection-des-donnees-dialog/protection-des-donnees-dialog.component';
import { PublicationComponent } from './components/publication/publication.component';
import { FormCreatePublicationComponent } from './components/form-create-publication/form-create-publication.component';
import { ParametreCompteComponent } from './components/parametre-compte/parametre-compte.component';
import { ModalChangePwdComponent } from './components/modal-change-pwd/modal-change-pwd.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormChangePpComponent } from './components/form-change-pp/form-change-pp.component';
import { FormChangeBanniereComponent } from './components/form-change-banniere/form-change-banniere.component';
import { FormParcoursComponent } from './components/form-parcours/form-parcours.component';

//SERVICES
import { AuthenticationUserService } from './services/authentification-user.service';
import { UtilisateurService } from './services/utilisateur.service';
import { AuthGuard } from './services/auth-guard.service'
import { UnauthGuardGuard } from './services/unauth-guard.guard';

//HTTP
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    MessagerieComponent,
    ProfilComponent,
    FormContactComponent,
    FormRegisterComponent,
    CguDialogComponent,
    FormLoginComponent,
    HeaderComponent,
    FooterComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    FormPwdComponent,
    MessagerieComponent,
    ConversationComponent,
    DetailsConversationComponent,
    DialogAjoutConversationComponent,
    DialogMessagerieComponent,
    FormCreatePublicationComponent,
    CreditsDialogComponent,
    MentionsLegalesDialogComponent,
    ProtectionDesDonneesDialogComponent,
    SearchComponent,
    PublicationComponent,
    ParametreCompteComponent,
    ModalChangePwdComponent,
    NotFoundComponent,
    FormChangePpComponent,
    FormChangeBanniereComponent,
    FormParcoursComponent
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
    MatCommonModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [AuthenticationUserService, MatIconRegistry, MatDialog, UtilisateurService, AuthGuard,UnauthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
