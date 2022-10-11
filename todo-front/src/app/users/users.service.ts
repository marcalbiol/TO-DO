import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../login/user";
import {Observable} from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlEndPoint: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {
  }


  login(user: User): Observable<any> { // component login

    return this.http.post("http://localhost:3000/auth/login", user);
  }

  create(user: User) { // component register

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<User>(this.urlEndPoint + "/users", JSON.stringify(user), httpOptions)
      .subscribe(value => {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
        console.log(`Usuario ${user.username} creado con éxito`)
      })
  }
}
