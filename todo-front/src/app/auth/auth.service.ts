import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../users/user';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {HomeService} from "../home/home.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint: string = 'http://localhost:3000'
  token: any;

  constructor(private http: HttpClient, private router: Router) {
  }


  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  public get logIn(): boolean {
    return (sessionStorage.getItem('token') !== null);
  }


  login(username: string, password: string) {
    return this.http.post(this.urlEndPoint + "/auth/login", {username: username, password: password})
      .subscribe(value => {
          console.log(value);
          this.token = value; // guarda el token
          sessionStorage.setItem('token', this.token)
          sessionStorage.setItem('user', username);
          // TODO REDIRECCIONAR A OTRA PAGINA
          Swal.fire(
          '',
            `Hola, ${username}`,
            'success'
          )
          this.router.navigateByUrl('/home') // te envia a la pagina principal
        },
        error => {
          //TODO controlar errores 401, 400...
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permiso para acceder',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      )
  }

  register(user: { password: string; username: string }): Observable<any> {

    return this.http.post<User>(this.urlEndPoint + "/users", user);
  }
}
