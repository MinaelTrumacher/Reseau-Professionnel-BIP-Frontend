import { Component } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/Publication';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private publicationService  : PublicationService,
              private route: ActivatedRoute,
              private router: Router) { }


  publicationList: Publication[] = [];



 ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const types = params['types'];
    const keywords = params['keywords'] !== undefined ? params['keywords']  : [];
    const villes = params['villes'] !== undefined ? params['villes']  : [];
    
    this.getPublicationByFiltre({
                                  "types": types !== undefined && types.length > 0 ? types : ['job_dating',
                                                                       'offre_stage',
                                                                       'offre_emploi',
                                                                       'afterwork',
                                                                       'recherche_stage',
                                                                       'recherche_emploi'
                                                                      ],
                                  "keywords":Array.isArray(keywords) ? keywords : [keywords],
                                  "villes": villes
                                });
  });
}

public getPublicationByFiltre(filtre:any){
  console.log(filtre)
  this.publicationService.getPublicationWithFiltre(filtre).subscribe({
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
