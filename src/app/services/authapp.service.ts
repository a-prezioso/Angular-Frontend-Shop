import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { server, port } from '../app.constants';

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

export class AuthappService {

  constructor(private httpClient: HttpClient) { }

  server = "localhost";
  port = "8086";
/*
  autentica(UserId, Password) {
    if(UserId === 'Alex' && Password === '123_Stella') {
        sessionStorage.setItem("Utente", UserId)
        return true;
    } else {
      return false;
    }
  }*/

 

  autenticaService(UserId: string, Password: string) {
    let AuthString = "Basic " + window.btoa(UserId + ":" + Password);
    let headers = new HttpHeaders(
      {Authorization: AuthString}
    )


    return this.httpClient.get<AuthData>(`http://${server}:${port}/api/articoli/test`, {headers})
      .pipe(
        map(
          data => {
            sessionStorage.setItem("Utente", UserId);
            sessionStorage.setItem("AuthToken", AuthString);
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
