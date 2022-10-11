import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  logout(token: any){
    this.userService.logout(token);
  }
}
