import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KeyComponent} from "../key/key.component";
import {CaisseComponent} from "./caisse.component";


export const CaisseRoutingModule: Routes = [
  {
      path: "",
      component: CaisseComponent,
  }
];

