import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { isMobile } from 'src/service/isMobile';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})

// UNUSED. Can be removed.
export class PdfViewerComponent implements OnInit {
  public isCookie: boolean;
  public isMobile = isMobile();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.isCookie = !this.router.url.includes('privacy');
  }
}
