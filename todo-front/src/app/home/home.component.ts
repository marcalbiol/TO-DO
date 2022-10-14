import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users/users.service";
import {AuthService} from "../auth/auth.service";
import {HomeService} from "./home.service";
import {User} from "../users/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username!: any;

  constructor(public authService: AuthService, private homeService: HomeService) {
  }


  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.homeService.getUser(this.username)

  }

}
