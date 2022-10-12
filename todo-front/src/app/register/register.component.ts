import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../users/user";
import {Router} from "@angular/router";
import swal from 'sweetalert2';
import {UsersService} from "../users/users.service";
import Swal from "sweetalert2";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  user: User = new User();

  constructor(private router: Router, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),

    });
  }

  onSubmit(): void {
    // code here after submit
    console.info(this.form.value);
  }

  //TODO CAMBIAR METODO A AUTHSERVICE == LOGIN
  register() {
    const user = {username: this.user.username, password: this.user.password}
    this.authService.register(user).subscribe(value => {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      console.log(`Usuario ${user.username} creado con éxito`)
    },
      error => {
      // validacion de la password y user
        console.log(error);
      }
      )
  }
}
