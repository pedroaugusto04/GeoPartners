import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partner } from '../model/partner';
import { AddressDTO } from '../model/address-dto';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private readonly API = "http://192.168.0.111:8080/geopartners/logic/";

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Partner[]>(this.API + "partners");
  }

  save(record: Partner) {
    const requestBody: string = JSON.stringify(record);
    return this.httpClient.post<Partner>(this.API + "register", requestBody, { headers: this.headers });
  }

  update(record: Partner) {
    const document = record.document;
    const requestBody: string = JSON.stringify(record);
    return this.httpClient.put<Partner>(this.API + "update/" + document, requestBody, { headers: this.headers });
  }

  delete(id: string) {
    return this.httpClient.delete<Partner>(this.API + "delete/" + id);
  }

  getBest(record: AddressDTO) {
    const address: string = JSON.stringify(record);
    return this.httpClient.post<Partner[]>(this.API + "search", address, { headers: this.headers });
  }
}
