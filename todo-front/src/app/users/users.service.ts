import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {Observable} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private http: HttpClient, private route: Router, private cookies: CookieService) {
  }


}
