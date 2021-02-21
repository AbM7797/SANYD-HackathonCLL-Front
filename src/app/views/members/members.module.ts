import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import {MembersComponent} from "./members.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FileUploadModule} from "ng2-file-upload";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {QuillModule} from "ngx-quill";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [MembersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    QuillModule,
    NgxDatatableModule,
    FileUploadModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forChild(MembersRoutingModule)

  ]
})
export class MembersModule { }
