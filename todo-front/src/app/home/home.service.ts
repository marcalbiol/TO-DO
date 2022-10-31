import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../users/user';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  userId!: number;
  private urlEndPoint: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,) {

  }

  async getUser(username: string): Promise<any> {
    return await this.http
      .get<User[]>(this.urlEndPoint + '/users/username/' + username)
      .toPromise();
  }

  async getTasks(userId: number): Promise<any> {
    this.userId = userId;
    return await this.http.get<Task[]>(this.urlEndPoint + "/tasks/" + userId).toPromise();
  }

  async getTasksWithCatId(categoryId: number) {
    return await this.http.get(this.urlEndPoint + "/tasks/ " + categoryId).toPromise();
  }

  async deleteTask(taskId: number) {
    return this.http.delete(this.urlEndPoint + "/tasks/delete/" + taskId).subscribe(res => {
      console.log("Tarea eliminada")
    });
  }

  async createTask(description: object, categoryId: number) {
    return this.http.post(this.urlEndPoint + "/category/create/task/" + categoryId, {description}).subscribe(() => {
      console.log("Tarea creada");
    })
  }

  async createCategory(name: object, userId: number) {
    console.log(userId)
    return this.http.post(this.urlEndPoint + '/category/create/' + userId, {name}).subscribe(() => {
      console.log("Categoria creada")
    });
  }

  async updateTask(description: string, taskId: number) {
    return this.http.patch(this.urlEndPoint + "/tasks/update/" + taskId, {description}).subscribe(() => {
      console.log("Tarea actualizada")
    })
  }

  async changeStatus(taskId: number) {
    return this.http.get(this.urlEndPoint + "/tasks/updateCompleted/" + taskId).subscribe(() => {
      console.log("Status cambiado")
    })
  }

  //TODO eliminar categoria

  //TODO implementar metodo crear nueva tarea autenticansdo el jwt
}
