import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  userLogged(){
    this.userService.getUser(1).subscribe(value => {
      console.log(value)
    })
  }

}
