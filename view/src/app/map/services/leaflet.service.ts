import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  constructor(private httpClient: HttpClient) { }

  processAddress(address: string): any {
    return this.httpClient.get("https://nominatim.openstreetmap.org/search?q=" + address + "&format=json&limit=1");
  }
}
