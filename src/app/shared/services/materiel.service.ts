import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  url=  environment.apiURL+'/materiels';
  constructor(protected httpClient : HttpClient) { }
  getAllMateriels(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getMaterielById(materielId: Number) {
    return this.httpClient.get<any>(this.url+'/'+materielId);
  }
  addMateriel(materiel):Observable<any> {
    return this.httpClient.post(this.url,materiel);
  }
  deleteMateriel(id) {
    return this.httpClient.delete(this.url+'/'+id);
  }
  updateMateriel(materiel){
    return this.httpClient.put(this.url+'/'+materiel.id,materiel);
  }
}
