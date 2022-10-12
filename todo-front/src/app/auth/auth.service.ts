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

  private urlEndPoint: string = 'http://localhost:3000'
  token: any;

  constructor(private http: HttpClient, private router: Router) {
  }


  logout() {
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  login(username: string, password: string) {
    return this.http.post(this.urlEndPoint + "/auth/login", {username: username, password: password})
      .subscribe(value => {
          console.log(value);
          this.token = value; // guarda el token
          localStorage.setItem('token', this.token)
          // TODO REDIRECCIONAR A OTRA PAGINA
          Swal.fire(
            '',
            `Hola, ${username}`,
            'success'
          )
          this.router.navigateByUrl('/') // te envia a la pagina principal
        },
        error => {
          //TODO controlar errores 401, 400...
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Credenciales incorrectas',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      )
  }

  register(user: User): Observable<any> {

    return this.http.post<User>(this.urlEndPoint + "/users", user);
  }

  getUser(id: number) {
    return this.http.get(this.urlEndPoint + "/users/" + id);
  }


}
