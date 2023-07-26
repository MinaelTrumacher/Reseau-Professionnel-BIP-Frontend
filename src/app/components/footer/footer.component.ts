import { Component } from '@angular/core';
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
  constructor(private dialog:MatDialog) {}

  expandFooter() {
    this.isFooterExpanded = true;
  }

  collapseFooter() {
    this.isFooterExpanded = false;
  }

  openContactForm(): void{
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
