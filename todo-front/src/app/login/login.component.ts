import {Component, OnInit} from '@angular/core';
import {User} from "../users/user";
import {FormControl, FormGroup} from "@angular/forms";
import {Route, Router} from "@angular/router";
import {UsersService} from "../users/users.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  user: User = new User();
  //TODO confirmar password field

  constructor(private userService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    // code here after submit
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),

    });
  }


  login() {
    const user = {username: this.user.username, password: this.user.password}
    this.userService.login(user).subscribe( value => {
      this.userService.setToken(value)
      Swal.fire(
        '',
        `Hola, ${user.username}`,
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
}
