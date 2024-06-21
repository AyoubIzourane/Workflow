import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntitePrimaireService } from '../../../../demo/service/entitePrimaire.service';

@Component({
  templateUrl: './details.html',
  styleUrls: ['../../../../../styles.scss']
})
export class DetailsComponent implements OnInit {
  entitePrimaire: any;

  constructor(
    private route: ActivatedRoute,
    private entitePrimaireService: EntitePrimaireService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const detailsId = Number(id); // Convert string to number
      this.entitePrimaireService.findOne(detailsId).subscribe(
        res => {
          this.entitePrimaire = res;
        },
        err => console.error(err)
      );
    }
  }

} 
