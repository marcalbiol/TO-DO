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

  private urlEndPoint: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private route: Router, private cookies: CookieService) {
  }

  logout(token: any){
    this.cookies.delete(token);
  }


  login(user: User): Observable<any> { // component login

    return this.http.post(this.urlEndPoint + "/auth/login", user);
  }

  register(user: User): Observable<any> { // component register

    return this.http.post<User>(this.urlEndPoint + "/users", user);
  }

  getUser(id: number){
    return this.http.get(this.urlEndPoint + "/users/" + id);
  }

  setToken(token: any) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

}
