import { Component } from '@angular/core';
import { SideComponent } from '../side/side.component';
import { EmployeeService } from '../employee/services/employee.service';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { CalenderComponent } from '../calender/calender.component';
import { ChartComponent } from '../chart/chart.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideComponent,NgIf,ProfileComponent,CalenderComponent,ChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  empCount:any=0
  sideBar:any=true
  adminEmail:any=""

  constructor(private emp:EmployeeService){

  }
  ngOnInit(): void {
    this.emp.getEmployeeListApi().subscribe({
      next:(res:any)=>{
        this.empCount=res.length
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
    this.adminEmail=JSON.parse(sessionStorage.getItem('admin')||'').email
  }

  toggleSideBar(){
    this.sideBar=!this.sideBar
  }

  onAdminChange(e:any){
    console.log(e)
    this.adminEmail=e
  }

}
