import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../users/user';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private urlEndPoint: string = 'http://localhost:3000';
  userId!: number;

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

  async deleteTask(taskId: number) {
    return this.http.delete(this.urlEndPoint + "/tasks/delete/" + taskId).subscribe(res => {
      console.log("Tarea eliminada")
    });
  }

  async createTask(description: object, userId: number) {
    return this.http.post(this.urlEndPoint + "/tasks/create/" + userId, {description}).subscribe(() => {
      console.log("Tarea creada");
    })
  }

  async updateTask(description: string, taskId: number) {
    return this.http.patch(this.urlEndPoint + "/tasks/update/" + taskId, {description}).subscribe(() => {
      console.log("Tarea actualizada")
    })
  }

  //TODO implementar metodo crear nueva tarea autenticansdo el jwt
}
