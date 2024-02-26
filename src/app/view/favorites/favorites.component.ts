import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public supplierList: any;

  constructor(
    private readonly dataService: DataService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dataService
      .getFavorites()
      .subscribe(
        (response) => (this.supplierList = this.dataService.mapSupplierList(response.data)),
      );
    this.dataService.updateFavorites.subscribe((data) => {
      if (data !== null) {
        this.supplierList.forEach((supplier: any, index: number) => {
          if (supplier.id == data.id) {
            this.supplierList.splice(index, 1);
            this.supplierList = [...this.supplierList];
          }
        });
      }
    });
  }
}
