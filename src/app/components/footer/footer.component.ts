import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { HeightService } from 'src/app/services/height.service';
import { MatDialog } from '@angular/material/dialog';
import { FormContactComponent } from '../form-contact/form-contact.component';
import { CguDialogComponent } from '../cgu-dialog/cgu-dialog.component';
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
  constructor(
    private dialog: MatDialog,
    private heightService: HeightService,
    private renderer: Renderer2, private el: ElementRef
  ) { }

  @ViewChild('footer') elementFooter!: ElementRef;

  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.handleWindowResize();
  }
  handleWindowResize() {
    this.heightService.setFooterHeightSubject(this.elementFooter.nativeElement.offsetHeight);
  }

  transitionEndListener!: () => void;

  ngAfterViewInit() {
    this.heightService.setFooterHeightSubject(this.elementFooter.nativeElement.offsetHeight);

   this.transitionEndListener = this.renderer.listen(this.elementFooter.nativeElement, 'transitionend', () => {
      this.heightService.setFooterHeightSubject(this.elementFooter.nativeElement.offsetHeight);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
    this.transitionEndListener();
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
