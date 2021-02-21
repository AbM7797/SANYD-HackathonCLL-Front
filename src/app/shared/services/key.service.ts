import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  url=  environment.apiURL+'/keyCLLs';
  constructor(protected httpClient : HttpClient) { }
  getAllKeys(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getKeyById(keyId: Number) {
    return this.httpClient.get<any>(this.url+'/'+keyId);
  }
  addKey(key):Observable<any> {
    return this.httpClient.post(this.url,key);
  }
  deleteKey(id) {
    return this.httpClient.delete(this.url+'/'+id);
  }
  updateKey(key){
    return this.httpClient.put(this.url+'/'+key.id,key);
  }


}
