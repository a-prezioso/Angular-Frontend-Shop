import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Articoli, ApiMsg } from 'src/app/articoli/articoli.component';
import { server, port } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ArticoliDataService {

  

  constructor(private httpClient:HttpClient) { }

  /*getBasicAuthHeader() {
    let UserId = "Alex";
    let Password = "Alex1993!"
    let retVal = "Basic " + window.btoa(UserId + ":" + Password);
    return retVal;
  }*/

  getArticoliByDescription(descrizione: string) {
   /* let headers = new HttpHeaders(
        {Authorization: this.getBasicAuthHeader()}
    )*/
    return this.httpClient.get<Articoli[]>(`http://${server}:${port}/api/articoli/cerca/descrizione/${descrizione}`); //ALT + 0096 
  }

  getArticoliByCodArt(codart: string) {
    return this.httpClient.get<Articoli>(`http://${server}:${port}/api/articoli/cerca/codice/${codart}`); //ALT + 0096 
  }

  getArticoliByEan(barcode: string) {
    return this.httpClient.get<Articoli>(`http://${server}:${port}/api/articoli/cerca/ean/${barcode}`); //ALT + 0096 
  }

  delArticoloByCodArt(codart: string) {
    return this.httpClient.delete<ApiMsg>(`http://${server}:${port}/api/articoli/elimina/${codart}`);
  }

  updArticolo(articolo: Articoli) {
    return this.httpClient.put<ApiMsg>(`http://${server}:${port}/api/articoli/modifica`, articolo);
  }

  insArticolo(articolo: Articoli) {
    return this.httpClient.post<ApiMsg>(`http://${server}:${port}/api/articoli/inserisci`, articolo);
  }



}
