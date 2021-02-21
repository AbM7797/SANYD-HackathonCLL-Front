import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyRoutingModule } from './key-routing.module';
import {KeyComponent} from "./key.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ChartsModule} from "ng2-charts";
import {FileUploadModule} from "ng2-file-upload";
import {SharedModule} from "../../shared/shared.module";
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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
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
    RouterModule.forChild(KeyRoutingModule)
  ],
  declarations: [KeyComponent],

})
export class KeyModule { }
