import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient, private route: Router, private cookies: CookieService) {
  }

}
