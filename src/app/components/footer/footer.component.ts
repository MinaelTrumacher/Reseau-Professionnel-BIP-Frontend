import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCguComponent } from '../modal-cgu/modal-cgu.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor (private dialog:MatDialog){
 
  }
  
  OpenCgu(){
    this.dialog.open(ModalCguComponent);
  }

}
