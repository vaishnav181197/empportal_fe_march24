import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  logForm:any={
    email:"",
    password:""
  }


  constructor(private admin:AdminService,private route:Router,private toastr:ToastrService){}

  submitted(){
    console.log(this.logForm);
    this.admin.getAdmin().subscribe({
      next:(res:any)=>{
        console.log(res)
        if(this.logForm.email == res.email && this.logForm.password == res.password){
          this.toastr.success("Login Successfull!!")
          sessionStorage.setItem('admin',JSON.stringify(res))
          this.route.navigateByUrl('/home')
        }
        else{
          this.toastr.error("Invalid Email/Password")
        }
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

}
