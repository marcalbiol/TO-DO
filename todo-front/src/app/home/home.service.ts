import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {User} from "../users/user";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  user: User;
  private urlEndPoint: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = new User()
  }

  getUser(username: string): Subscription{
    return this.http.get<User[]>(this.urlEndPoint + "/users/username/" + username)
      .subscribe(value => {
        console.log(value)
      });
  }

}
