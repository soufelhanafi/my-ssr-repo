import { Component, Input, OnInit } from '@angular/core';

import { Supplier } from 'src/model/supplier';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  @Input() supplierDetails: Supplier;
  public isFavorite: boolean | undefined;

  constructor(private readonly ds: DataService) {}

  ngOnInit(): void {
    this.isFavorite = this.supplierDetails.isFavorite;
    console.log(this.supplierDetails.capacityMin);
  }

  public clickOnFavoriteIcon(event: any, supplier: any): void {
    event.stopPropagation();
    const element = event.target;
    element?.classList.add('animate__animated', 'animate__zoomOutDown');

    element?.addEventListener('animationend', () => {
      element?.classList.remove('animate__animated', 'animate__zoomOutDown');
    });

    if (!this.isFavorite) {
      this.ds.addToFavorites(supplier.id).subscribe();
      this.ds.updateFavorites.next({ id: supplier.id, isFavorite: true });
    } else {
      this.ds.removeFromFavorites(supplier.id).subscribe((response) => {
        console.log(response);
      });
      this.ds.updateFavorites.next({ id: supplier.id, isFavorite: false });
    }
    this.isFavorite = !this.isFavorite;
  }
}
