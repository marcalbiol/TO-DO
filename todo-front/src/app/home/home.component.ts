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
  newTaskName!: any;
  routerLink: string = '/home';

  constructor(
    public authService: AuthService,
    public homeService: HomeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('user');
    this.homeService.getUser(this.token).then((res) => {
      this.userData = res.user;
      this.userId = res.user.id; // obetenemos el id del usuario para recoger las tareas asociadas

      // todas las tareas
      this.getAllTasks(this.userId)
    });

    if (this.token == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Necesitas estar logeado',
      });
      // reedirect al login
    }
  }

  getAllTasks(userId: number) {
    this.homeService.getTasks(userId).then((res) => {
      this.tasks = res
    })
  }

  updateTask(event: any, value: string, taskId: number) {
    if (event.keyCode == 13) {
      this.homeService.updateTask(value, taskId).then(() => {
      })
    }
  }

  insertNewTask(event: any) {
    if (event.keyCode == 13) {
      // pasamos los parametros para crear la tarea
      this.homeService.createTask(this.newTaskName, this.userId).then(r => {
        this.router.navigate(['/']).then(() => {
          this.router.navigate([this.routerLink]);
        })
      });
    }
  }
}
