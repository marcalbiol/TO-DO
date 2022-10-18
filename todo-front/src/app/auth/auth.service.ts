import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../users/user';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  private urlEndPoint: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private router: Router) {
  }

  public get logIn(): boolean {
    return (sessionStorage.getItem('token') !== null);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  login(username: string, password: string) {
    return this.http.post(this.urlEndPoint + "/auth/login", {username: username, password: password})
      .subscribe(value => {
          console.log(value);
          this.token = value; // guarda el token
          sessionStorage.setItem('token', this.token)
          sessionStorage.setItem('user', username);
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
