import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  url=  environment.apiURL+'/users';
  constructor(protected httpClient : HttpClient
  ,
              private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getUserById(userId: Number) {
    return this.httpClient.get<any>(this.url+'/'+userId);
  }
  addUser(user):Observable<any> {
    return this.httpClient.post(this.url,user);
  }
  deleteUser(id) {
    return this.httpClient.delete(this.url+'/'+id);
  }
  updateUser(user){
    return this.httpClient.put(this.url+'/'+user.id,user);
  }
  register(user) {
    return this.httpClient.post<any>(environment.apiURL+'/register',user);
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/sessions/signin');
  }
  authenticate(username,password) {
    return this.httpClient.post<any>(environment.apiURL + '/login', {username, password}).pipe(map(user =>{
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }
  private currentUserSubject : BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  newHeader = {
    headers: new HttpHeaders ({
      'Content-Type':  'text/uri-list',
      'Accept':'text/uri-list'
    })
  };

  addKey(idMember,idKey){
    return this.httpClient.put(this.url+"/"+idMember+"/key",environment.apiURL+"/keyCLLs/"+idKey,this.newHeader)
  }
  getMemberByKey(key){
    return this.httpClient.post(this.url+'/search/findUserByKey',key);
  }
}
