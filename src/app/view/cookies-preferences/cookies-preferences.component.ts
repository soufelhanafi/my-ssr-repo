import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cookies-preferences',
  templateUrl: './cookies-preferences.component.html',
  styleUrls: ['./cookies-preferences.component.scss'],
})
export class CookiesPreferencesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  public cookieSelection: FormGroup;
  public inputCookies = [
    {
      name: '1',
      text: 'Activeaza tot',
      value: false,
      formControlName: 'allActive',
    },
    {
      name: '2',
      text: 'Securitate',
      value: false,
      formControlName: 'security',
    },
    {
      name: '3',
      text: 'Experienta utilizatorului',
      value: true,
      formControlName: 'userExperience',
    },
    {
      name: '4',
      text: 'Setarile limbii',
      value: true,
      formControlName: 'languageSettings',
    },
  ];

  public ngOnInit(): void {
    this.cookieSelection = new FormGroup({
      allActive: new FormControl(false),
      security: new FormControl(false),
      userExperience: new FormControl(false),
      languageSettings: new FormControl(false),
    });
  }

  public toggleAllActive() {
    const allActiveValue = this.cookieSelection.get('allActive')?.value;
    this.cookieSelection.patchValue({
      security: allActiveValue,
      userExperience: allActiveValue,
      languageSettings: allActiveValue,
    });
  }

  // TODO: Make this work?
  // public onArrowClick() {
  //   this.dialog;
  // }
}
