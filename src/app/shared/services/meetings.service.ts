import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  url=  environment.apiURL+'/meetingManagments';
  constructor(protected httpClient : HttpClient) { }
  getAllMeetings(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getMeetingById(meetingId: Number) {
    return this.httpClient.get<any>(this.url+'/'+meetingId);
  }
  addMeeting(meeting):Observable<any> {
    return this.httpClient.post(this.url,meeting);
  }
  deleteMeeting(id) {
    return this.httpClient.delete(this.url+'/'+id);
  }
  updateMeeting(meeting){
    return this.httpClient.put(this.url+'/'+meeting.id,meeting);
  }
}
