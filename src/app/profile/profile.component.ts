import { Component, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { profile } from 'console';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  formStatus: any = false
  profileImage: any = 'https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png'
  adminProfile:any={
    image:"",email:"",password:""
  }
  @Output() adminEvent=new EventEmitter()


  toggleStatus() {
    this.formStatus = !this.formStatus
  }

  constructor(private admin:AdminService,private toastr:ToastrService,private router:Router){

  }

  ngOnInit(): void {
    this.admin.getAdmin().subscribe({
      next:(res:any)=>{
        this.adminProfile=res
        // console.log(res)
        console.log(this.adminProfile);
        if(res.image){
          this.adminProfile.image=res.image
          this.profileImage=res.image
        }
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  getFile(e:any){
    const file=e.target.files[0]
    const fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event);
      this.profileImage=event.target.result
      this.adminProfile.image=event.target.result
    }
  }

  handleSubmit(){
    console.log(this.adminProfile)
    const headerobj=new HttpHeaders()
    // const header={'Content-Type':'multipart/form-data'}
    headerobj.set('Content-Type','multipart/form-data')
    this.admin.updateAdmin(this.adminProfile,headerobj).subscribe({
      next:(res:any)=>{
        console.log(res.email)
        this.toastr.success("Profile Updated")
        this.toggleStatus()
        sessionStorage.setItem('admin',JSON.stringify(res))
        this.adminEvent.emit(res.email)
        // this.router.navigateByUrl('/')
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err)
      }
    })
  }

}
