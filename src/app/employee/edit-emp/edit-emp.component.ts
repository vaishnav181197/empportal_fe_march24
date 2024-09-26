import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrl: './edit-emp.component.css'
})
export class EditEmpComponent implements OnInit{

  eid:any="";
  employee:any={
    name:"",phone:"",status:"",eid:""
  }

  constructor(private ar:ActivatedRoute,private emp:EmployeeService,private toastr:ToastrService,private router:Router){
    this.ar.params.subscribe({
      next:(res:any)=>{
        console.log(res);
        this.eid=res.id
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.emp.getEmployeeApi(this.eid).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.employee=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  submitted(e:any){
    e.preventDefault()
    console.log(this.employee);
    this.emp.updateEmployee(this.employee.id,this.employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("Employee Details Updated!!")
        this.router.navigateByUrl('/employee')
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error(err)
      }
    })
  }

}
