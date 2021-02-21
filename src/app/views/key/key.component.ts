import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomValidators} from "ngx-custom-validators";
import {Member} from "../members/members.component";
import {KeyService} from "../../shared/services/key.service";
import {Materiel} from "../materiel/materiel.component";
import {MembersService} from "../../shared/services/members.service";

export interface Key {
  id:number,
  firstName:string,
  lastName:string,
  phone:number
}
@Component({
  selector: "app-key",
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  formData = {};
  console = console;
  basicForm: FormGroup;
  focus;
  message;
  keys;
  members;
  submitted= false;
  show  = false;
  type;
  currentUser;

  displayedColumns: string[] = ['id','FirstName','LastName','Phone'];
  dataSource: MatTableDataSource<Key>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
      private keyService: KeyService,
      private membersService: MembersService
  ) {}

  ngOnInit() {
    this.basicForm = new FormGroup({
      memberId: new FormControl("", [Validators.required]),
    });
    this.membersService.getAllUsers().subscribe(users=>{
      this.members = users._embedded.users;
      console.log(this.members);
    })
    this.currentUser = localStorage.getItem("currentUser");

  }
  setKey(){
    this.keyService.getAllKeys().subscribe(keys=>{

      this.keys = keys._embedded.keyCLLs;
      this.keys.forEach(key=>{
        console.log("k",key);
        this.membersService.getMemberByKey(key.id).subscribe(member=>{
          console.log(member);
        })
      })
      console.log("keys",this.keys);
      this.dataSource = new MatTableDataSource<Key>(this.keys);
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
  ngAfterViewInit() {
    this.setKey();
  }

  onSubmit(){
    console.log(this.basicForm);
    this.submitted = true;
    if(this.basicForm.invalid){
      return;
    }
    this.keyService.addKey(this.basicForm.value).subscribe(key=>{
      this.membersService.addKey(this.basicForm.value.memberId,key.id).subscribe(key=>{
          this.basicForm.reset();
          this.setKey();
          this.submitted = false;
      })
    })
  }
}
