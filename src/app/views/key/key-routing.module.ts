import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KeyComponent} from "./key.component";


export const KeyRoutingModule: Routes = [
  {
      path: "",
      component: KeyComponent,
      data: { title: 'Blank', breadcrumb: 'Blank' }
  }
];
