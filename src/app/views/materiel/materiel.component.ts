import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomValidators} from "ngx-custom-validators";
import {MaterielService} from "../../shared/services/materiel.service";
import {Member} from "../members/members.component";

export interface Materiel {
  id:number,
  name:string,
}
@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit {
  formData = {};
  console = console;
  basicForm: FormGroup;
  focus;
  message;
  materiels;
  show  = false;
  submitted = false;
  type;
  displayedColumns: string[] = ['id', 'Name'];
  dataSource: MatTableDataSource<Materiel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
      private materielService: MaterielService
  ) {}

  ngOnInit() {
    let password = new FormControl("", Validators.required);
    let confirmPassword = new FormControl(
        "",
        CustomValidators.equalTo(password)
    );

    this.basicForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
  }
  setMateriel(){
    this.materielService.getAllMateriels().subscribe(materiels=>{
      this.materiels = materiels._embedded.materiels;
      this.dataSource = new MatTableDataSource<Materiel>(this.materiels);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngAfterViewInit() {
    this.setMateriel()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit(){
    console.log(this.basicForm);
    this.submitted = true;
    if(this.basicForm.invalid){
      return;
    }


    this.materielService.addMateriel(this.basicForm.value).subscribe(materiel =>{
      this.basicForm.reset();
      this.setMateriel();
      this.submitted = false;
    })
  }
}
