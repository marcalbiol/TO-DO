import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../users/user';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private urlEndPoint: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  async getUser(username: string): Promise<any> {
    return await this.http
      .get<User[]>(this.urlEndPoint + '/users/username/' + username)
      .toPromise();
  }

  async getTasks(userId: number): Promise<any> {
    return await this.http.get<Task[]>(this.urlEndPoint + "/tasks/" + userId).toPromise();
  }

  async deleteTask(taskId: number) {
    console.log(taskId)
    return this.http.delete(this.urlEndPoint + "/tasks/delete/" + taskId).subscribe(res => {
      console.log(res)
    });
  }

  //TODO implementar metodo crear nueva tarea autenticansdo el jwt

  // METODO BORRAR Y EDITAR
}
