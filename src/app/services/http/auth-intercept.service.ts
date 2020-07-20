import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthappService } from '../authapp.service';
import { AuthJWTService } from '../authJWTService';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {
/* FORSE DA CAMBIARE AUTHJWTSERVICE */
  constructor(private BasicAuth: AuthJWTService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let AuthToken = this.BasicAuth.getAuthToken();
    let User = this.BasicAuth.loggedUser();

    if(AuthToken && User) {
    request = request.clone
    (
      {
        setHeaders :
        {
          Authorization: AuthToken
        }
      })
    }
    return next.handle(request);
  }

}

/*
SERVE A COSTRUIRE UN USER ADMIN PER IL MONGO CHE SI PUò FARE SOLO ATTRAVERO IL CONTENITORE DOCKER DOPO AVER AVVIATO LA BASH
db.createUser({
  user:"admin",
  pwd:"Alex1993!",
  roles:[
    { role: "userAdminAnyDatabase", db: "admin" }
  ]
})

db.createUser({
  user:"alex",
  pwd:"Alex1993!",
  roles:[{ role: "readWrite", db: "ms-users"}]
})
*/
