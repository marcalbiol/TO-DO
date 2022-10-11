import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {FormControl, FormGroup} from "@angular/forms";
import {Route, Router} from "@angular/router";
import {UsersService} from "../users/users.service";

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
      console.log(value) // token
      //TODO controlar error 401 unauthorized
    })
  }
}
