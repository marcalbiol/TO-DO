import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }


}
