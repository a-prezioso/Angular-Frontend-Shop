import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthappService } from '../services/authapp.service';
import { AuthJWTService } from '../services/authJWTService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid = ''
  password = ''
  autenticato = true
 // consentito = false
  errorMsg = 'Spiacente, lo username o la password sono errati!'
//  infoMsg = 'Accesso Consentito'

  constructor(private route : Router, private BasicAuth: AuthJWTService) {

   }

  ngOnInit() {
  }

  gestAut() {
    this.BasicAuth.autenticaService(this.userid, this.password).subscribe(
      data => {
        console.log(data);
        this.autenticato = true;
        this.route.navigate(['welcome', this.userid]);
      },
      error => {
        console.log(error);
        this.autenticato = false;
      }
    )
  }

}
