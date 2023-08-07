import { Component} from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { OnInit } from '@angular/core';
import { Publication } from 'src/app/models/Publication';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private publicationService  : PublicationService) { }

   publicationList: Publication[] = [];

   ngOnInit() {
    this.getAllPublications();
   }

   public getAllPublications(){
    this.publicationService.getAllPublications().subscribe({
    next: (publications: Publication[]) => {
      console.log(publications);
      this.publicationList = publications;
    },
    error: (error) => {
      console.error(error);
    }
  });
  }
   
}

