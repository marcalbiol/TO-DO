import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HomeService} from './home.service';
import {User} from '../users/user';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userData!: User;
  tasks!: any;
  token!: any;
  userId!: number;

  constructor(
    public authService: AuthService,
    public homeService: HomeService,
    private router: Router
  ) {
  }

  //TODO EDITAR HOME HTML
  //TODO CREAR TABLA CON LAS TAREAS

  ngOnInit() {
    this.token = sessionStorage.getItem('user');

    this.homeService.getUser(this.token).then((res) => {
      this.userData = res.user;
      this.userId = res.user.id; // obetenemos el id del usuario para recoger las tareas asociadas

      this.homeService.getTasks(this.userId).then((res) => {
        this.tasks = res;
        console.log(this.tasks)
      })
    });

    if (this.token == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Necesitas estar logeado',
      });
      // reedirect al login
      this.router.navigateByUrl('/');
    }
  }
}
