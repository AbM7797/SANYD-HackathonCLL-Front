import {Component, OnInit, ViewChild} from '@angular/core';
import {matxAnimations} from "../../shared/animations/matx-animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomValidators} from "ngx-custom-validators";
import {CaisseService} from "../../shared/services/caisse.service";
import {Materiel} from "../materiel/materiel.component";

export interface Caisse {
  id:number,
  source:string,
  montant:string,
  typeTransaction:string,
  date:string
}

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {
  formData = {};
  console = console;
  basicForm: FormGroup;
  focus;
  message;
  caisses;
  submitted = false;
  show  = false;
  type;
  displayedColumns: string[] = ['id', 'Source', 'Montant','TypeTransaction','Date'];
  dataSource: MatTableDataSource<Caisse>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
      private caisseService: CaisseService
  ) {}

  ngOnInit() {
    this.basicForm = new FormGroup({
      source: new FormControl("", [Validators.required]),
      montant: new FormControl("", [Validators.required]),
      typeTransaction: new FormControl("", [Validators.required]),
      date: new FormControl(),
    });
  }
  setCaisse(){
    this.caisseService.getAllCaisses().subscribe(caisses=>{
      this.caisses = caisses._embedded.caisses;
      this.dataSource = new MatTableDataSource<Caisse>(this.caisses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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


    this.caisseService.addCaisse(this.basicForm.value).subscribe(materiel =>{
      this.basicForm.reset();
      this.setCaisse();
      this.submitted = false;
    })
  }
}
