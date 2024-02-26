import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    ScrollingModule,
  ],
  exports: [
    MatInputModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    ScrollingModule,
  ],
  providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }],
})
export class AngularMaterialItemsModule {}
