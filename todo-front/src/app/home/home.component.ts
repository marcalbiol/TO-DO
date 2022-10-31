import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HomeService} from './home.service';
import {User} from '../users/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: string = "TO-DO app"
  userData!: User;
  userId!: any;
  categories!: any;
  tasks!: any;
  token!: any;
  newTask!: any;
  newCategory!: any;
  categoryId!: number;

  constructor(public authService: AuthService, public homeService: HomeService,) {
  }

  ngOnInit() {

    this.token = sessionStorage.getItem('user');

    this.homeService.getUser(this.token).then((res) => {
      this.userData = res.user;
      this.categories = res.user.categories
      this.userId = res.user.id;

      console.log(res)

      this.getTasks(this.categoryId)
    });

    if (this.token == null) {
      Swal.fire({
        icon: 'error', title: 'Oops...', text: 'Necesitas estar logeado',
      });
      // reedirect al login
    }
  }

  async getTasks(categoryId: number) {
    this.categoryId = categoryId;
    console.log(categoryId)
    await this.homeService.getTasksWithCatId(categoryId).then((res) => {
      this.tasks = res
    })
  }

  async deleteTask(taskId: number) {
    await this.homeService.deleteTask(taskId).then(() => {
      this.ngOnInit()
    })
  }

  async updateTask(event: any, value: string, taskId: number) {
    if (event.keyCode == 13) {
      await this.homeService.updateTask(value, taskId).then(() => {
        this.ngOnInit()
      })
    }
  }

  //TODO resetear campo al escribir nueva tarea
  async insertNewTask(event: any) {
    if (event.keyCode == 13) {
      // pasamos los parametros para crear la tarea
      await this.homeService.createTask(this.newTask, this.categoryId).then(r => {
        this.ngOnInit()
      });
    }
  }

  async insertNewCategory(event: any) {
    if (event.keyCode == 13) {
      // pasamos los parametros para crear la tarea
      await this.homeService.createCategory(this.newCategory, this.userId).then(r => {
        this.ngOnInit()

      });
    }
  }

  async changeStatus(taskId: number) {
    await this.homeService.changeStatus(taskId).then(() => {
      this.ngOnInit()
    })
  }

}
