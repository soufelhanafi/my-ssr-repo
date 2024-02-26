import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-suplier-list',
  templateUrl: './suplier-list.component.html',
  styleUrls: ['./suplier-list.component.scss'],
})
export class SuplierListComponent implements OnInit {
  @Input() supplierList: any[] = [];

  public date: string | null;

  constructor(
    private dataService: DataService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.date = params['dateInput'];
    });
  }

  public goToSupplier(supplierDetails: any): void {
    this.dataService.navigateToSupplierDetails(supplierDetails.id, this.date);
  }
}
