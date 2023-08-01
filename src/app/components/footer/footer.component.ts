import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormContactComponent } from '../form-contact/form-contact.component';
import { CguDialogComponent } from '../cgu-dialog/cgu-dialog.component';
import { HeightService } from 'src/app/services/height.service';
import { CreditsDialogComponent } from '../credits-dialog/credits-dialog.component';
import { MentionsLegalesDialogComponent } from '../mentions-legal-dialog/mentions-legal-dialog.component';
import { ProtectionDesDonneesDialogComponent } from '../protection-des-donnees-dialog/protection-des-donnees-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isFooterExpanded: boolean = true; // position initiale du footer = déployée
  constructor(private dialog: MatDialog,
    private heightService: HeightService) { }

  @ViewChild('footer',{static : true}) elementFooter!: ElementRef;

  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.handleWindowResize();
  }

  ngDoCheck() {
    setTimeout(()=>{
      this.heightService.setFooterHeightSubject(this.elementFooter.nativeElement.offsetHeight);
    },500);
  }

  handleWindowResize() {
    this.heightService.setFooterHeightSubject(this.elementFooter.nativeElement.offsetHeight);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  expandFooter() {
    this.isFooterExpanded = true;
  }

  collapseFooter() {
    this.isFooterExpanded = false;
  }

 /*--------------------Gestion des liens du Footer------------------ */
  openContactForm(): void{
    this.dialog.open(FormContactComponent, {
      width: '400px'
    });
  }
  openCgu() {
    const dialogRef = this.dialog.open(CguDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Fermeture de la boite de dialogue');
    })
  }
  openModalCredit() {
      this.dialog.open(CreditsDialogComponent);   
  }
  openModalMentionsLegales() {
    this.dialog.open(MentionsLegalesDialogComponent);
  }
  openModalProtectionDesDonnees() {
    this.dialog.open(ProtectionDesDonneesDialogComponent);
  }
}
