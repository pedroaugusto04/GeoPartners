import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partner } from '../model/partner';
import { GeometriesDTO } from '../model/geometries-dto';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private readonly API = environment.baseUrl;

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Partner[]>(this.API + "partners").pipe(first()); // receives only first response
  }

  save(record: Partner) {
    const requestBody: string = JSON.stringify(record);
    return this.httpClient.post<Partner>(this.API + "register", requestBody, { headers: this.headers }).pipe(first());
  }

  update(record: Partner) {
    const document = record.document;
    const requestBody: string = JSON.stringify(record);
    return this.httpClient.put<Partner>(this.API + "update/" + document, requestBody, { headers: this.headers }).pipe(first());
  }

  delete(id: string) {
    return this.httpClient.delete<Partner>(this.API + "delete/" + id).pipe(first());
  }

  getBest(record: GeometriesDTO) {
    const geometries: string = JSON.stringify(record);
    return this.httpClient.post<Partner[]>(this.API + "search", geometries, { headers: this.headers }).pipe(first());
  }
}
