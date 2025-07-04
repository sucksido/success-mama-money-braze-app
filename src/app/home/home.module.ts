import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import HomePage from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomePage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
})
export class HomePageModule {}