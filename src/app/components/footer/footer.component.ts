import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HeightService } from 'src/app/services/height.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ModalCguComponent } from '../modal-cgu/modal-cgu.component';
import { ModalCguContentComponent } from '../modal-cgu-content/modal-cgu-content.component';
import { MatDialogModule } from '@angular/material/dialog';

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

  openContactForm(): void {
    this.dialog.open(ContactFormComponent, {
      width: '400px'
    });
  }

  openCgu() {
    const dialogRef = this.dialog.open(ModalCguContentComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Fermeture de la boite de dialogue');
    })
  }
}
