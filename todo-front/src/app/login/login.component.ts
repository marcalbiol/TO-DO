import {Component, OnInit} from '@angular/core';
import {User} from "../users/user";
import {FormControl, FormGroup} from "@angular/forms";
import {Route, Router} from "@angular/router";
import {UsersService} from "../users/users.service";
import Swal from "sweetalert2";
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  user: User = new User();

  //TODO confirmar password field

  constructor(public authService: AuthService, private router: Router) {

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

  Login() {
    console.log("Te estas logeando...");

    this.authService.login(this.user.username, this.user.password);
  }
}
