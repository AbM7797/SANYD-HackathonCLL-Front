import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CaisseService {
  url=  environment.apiURL+'/caisses';
  constructor(protected httpClient : HttpClient) { }
  getAllCaisses(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getCaisseById(caisseId: Number) {
    return this.httpClient.get<any>(this.url+'/'+caisseId);
  }
  addCaisse(caisse):Observable<any> {
    return this.httpClient.post(this.url,caisse);
  }
  deleteCaisse(id) {
    return this.httpClient.delete(this.url+'/'+id);
  }
  updateCaisse(caisse){
    return this.httpClient.put(this.url+'/'+caisse.id,caisse);
  }
}
