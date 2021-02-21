import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KeyComponent} from "../key/key.component";
import {MeetingsComponent} from "./meetings.component";


export const MeetingsRoutingModule: Routes = [
  {
      path: "",
      component: MeetingsComponent,
  }
];
