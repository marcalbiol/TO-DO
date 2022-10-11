import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../users/user";
import {Router} from "@angular/router";
import swal from 'sweetalert2';
import {UsersService} from "../users/users.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  user: User = new User();

  constructor(private router: Router, private userService: UsersService) {
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

  register() {
    const user = {username: this.user.username, password: this.user.password};
    this.userService.register(user).subscribe(value => {
      this.userService.setToken(value) // token
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
