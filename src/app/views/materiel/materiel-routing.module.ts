import { Routes, RouterModule } from '@angular/router';
import {MaterielComponent} from "./materiel.component";

export const MaterielRoutingModule: Routes = [
  {
      path: "",
      component: MaterielComponent,
      data: { title: 'Blank', breadcrumb: 'Blank' },
  }
];

