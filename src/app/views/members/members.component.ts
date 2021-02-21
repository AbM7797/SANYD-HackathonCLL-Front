import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ngx-custom-validators";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MembersService} from "../../shared/services/members.service";

export interface Member {
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  status:string;
  phone:string;
  username:string;
  password:string;
  role:string;
}
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  formData = {};
  console = console;
  members;
  basicForm: FormGroup;
  focus;
  message;
  show  = false;
  submitted = false;
  type;
  currentUser;

  displayedColumns: string[] = ['id', 'FirstName', 'LastName','Email','Status','Phone'];
  dataSource: MatTableDataSource<Member>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
      private membersService: MembersService

  ) {}

  ngOnInit() {

    let password = new FormControl("", Validators.required);
    let confirmPassword = new FormControl(
        "",
        CustomValidators.equalTo(password)
    );

    this.basicForm = new FormGroup({
      username: new FormControl("", [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      password: password,
      confirmPassword: confirmPassword,
      role: new FormControl("", [Validators.required]),
    });
    this.currentUser = localStorage.getItem("currentUser");

  }
  setMembers(){
    this.membersService.getAllUsers().subscribe(users=>{
      this.members = users._embedded.users;
      this.dataSource = new MatTableDataSource<Member>(this.members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngAfterViewInit() {
    this.setMembers()
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

      this.basicForm.value['status'] = 'ACTIVE';

    this.membersService.register(this.basicForm.value).subscribe(etudiant =>{
      this.basicForm.reset();
      this.setMembers();
      this.submitted = false;
    })
  }

}
