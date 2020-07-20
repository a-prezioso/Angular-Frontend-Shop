import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalutiDataService {

  constructor(private httpClient:HttpClient) { }

  getSaluti(nome) {
    return this.httpClient.get(`http://localhost:8086/api/saluti/${nome}`);
  }

}
