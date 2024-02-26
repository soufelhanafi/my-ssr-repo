import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { ReusableComponentsModule } from 'src/app/reusable/reusable.module';
import { DataService } from 'src/service/data.service';

import { HomeComponent } from './home.component';
import { PhonesSliderComponent } from './phones-slider/phones-slider.component';
import { SearchStepperComponent } from './search-stepper--deprecated/search-stepper.component';
import { StartNowComponent } from './start-now--deprecated/start-now.component';
import { BreadcrumbNavigationComponent } from '../breadcrumb-navigation/breadcrumb-navigation.component';
import { ListYourServiceComponent } from '../list-your-service/list-your-service.component';
import { QuestionAnswearComponent } from '../question-answear/question-answear.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListYourServiceComponent,
    SearchStepperComponent,
    StartNowComponent,
    QuestionAnswearComponent,
    BreadcrumbNavigationComponent,
    PhonesSliderComponent,
  ],
  imports: [CommonModule, MatInputModule, ReusableComponentsModule, RouterModule],
  exports: [HomeComponent],
  providers: [DataService],
})
export class HomeModule {}
