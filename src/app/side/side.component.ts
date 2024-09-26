import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {Router} from '@angular/router'

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side.component.html',
  styleUrl: './side.component.css'
})
export class SideComponent {

  constructor(private router:Router){}

  logout(){
    this.router.navigateByUrl('/')
    sessionStorage.clear()
  }
}
