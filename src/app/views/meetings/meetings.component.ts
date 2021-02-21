import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomValidators} from "ngx-custom-validators";
import {MeetingsService} from "../../shared/services/meetings.service";
import {Member} from "../members/members.component";
export interface Meeting {
  id:number;
  date:string;
  sujet:string;
}
@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  formData = {};
  console = console;
  basicForm: FormGroup;
  focus;
  meetings;
  message;
  show  = false;
  submitted = false;
  type;
  currentUser;

  displayedColumns: string[] = ['id', 'Sujet', 'Date'];
  dataSource: MatTableDataSource<Meeting>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
      private meetingsService: MeetingsService
  ) {}

  ngOnInit() {
    this.basicForm = new FormGroup({
      date: new FormControl("", [Validators.required]),
      sujet: new FormControl("", [Validators.required]),
    });
    this.currentUser = localStorage.getItem("currentUser");

  }
  setMeetings(){
    this.meetingsService.getAllMeetings().subscribe(meetings=>{
      this.meetings = meetings._embedded.meetingManagments;
      this.dataSource = new MatTableDataSource<Meeting>(this.meetings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngAfterViewInit() {
    this.setMeetings()
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

    this.meetingsService.addMeeting(this.basicForm.value).subscribe(meeting =>{
      this.basicForm.reset();
      this.setMeetings();
      this.submitted = false;
    })
  }

}
