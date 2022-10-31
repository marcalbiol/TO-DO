import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title?: string = 'TO-DO app';

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }


}
