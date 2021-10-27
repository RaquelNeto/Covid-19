import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private session: SessionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  logout():void{
    this.session.logout().subscribe();
  }

}
