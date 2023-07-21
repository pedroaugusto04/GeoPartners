import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partner } from '../partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private readonly API = "http://192.168.0.111:8080/geopartners/logic/";
  
  constructor(private httpClient: HttpClient) { }

  getAll() {
    console.log(this.API + "partners");
    return this.httpClient.get<Partner[]>(this.API + "partners");
  }

  save(record: Partner) {
    return this.httpClient.post<Partner>(this.API + "register", record);
  }

  update(record: Partner) {
    //return this.httpClient.put<Partner>(this.API + "/" + record.id, record);
  }

  delete(id: string) {
    console.log(this.API + "delete/" + id);
    return this.httpClient.delete<Partner>(this.API + "delete/" + id);
  }
}
