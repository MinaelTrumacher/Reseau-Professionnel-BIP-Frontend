import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Mat import
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

//Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { ProfilComponent } from './components/profil/profil.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ModalCguComponent } from './components/modal-cgu/modal-cgu.component';
import { FormloginComponent } from './components/form-login/form-login.component'; 
import { FormPwdComponent } from './components/form-pwd/form-pwd.component'; 
import { GridComponent } from './components/grid/grid.component';

//Service
import { AuthenticationUserService } from './services/authentification-user.service';

//Http
import { HttpClientModule } from '@angular/common/http';

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
    FormPwdComponent,
    FormloginComponent,
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
    MatSnackBarModule,
    MatStepperModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTooltipModule
  ],
  providers: [AuthenticationUserService, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
