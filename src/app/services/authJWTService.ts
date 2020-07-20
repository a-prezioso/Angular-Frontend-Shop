import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { server, port, authServerUri } from '../app.constants';

export const CONST_UTENTE = "Utente";
export const CONST_AUTH_TOKEN = "AuthToken";


export class AuthData {
  constructor(
    public codice: string,
    public messaggio: string
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthJWTService {

  constructor(private httpClient: HttpClient) { }
 

  autenticaService(username: string, password: string) {
  
    return this.httpClient.post<any>(`${authServerUri}`, {username, password}).pipe(
        map(
          data => {
            sessionStorage.setItem(CONST_UTENTE, username);
            sessionStorage.setItem(CONST_AUTH_TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      ); 
  }

  loggedUser() {
    let utente = sessionStorage.getItem("Utente");
    return (sessionStorage.getItem("Utente") != null) ? utente : "";
  }
  
  getAuthToken() {
    if(this.loggedUser)
      return sessionStorage.getItem("AuthToken");
    else
      return "";
  }

  isLogged() {
    return (sessionStorage.getItem("Utente") != null) ? true : false;
  }

  clearAll() {
    sessionStorage.removeItem("Utente")
  }

}
