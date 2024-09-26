import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // base_url:string="http://localhost:3000"
  base_url:string="https://empportal-be-march24.onrender.com"

  constructor(private http:HttpClient) { }

  addEmployeeApi(data:any){
    return this.http.post(`${this.base_url}/employees`,data)
  }

  getEmployeeListApi(){
    return this.http.get(`${this.base_url}/employees`)
  }

  deleteEmployeeApi(id:any){
    return this.http.delete(`${this.base_url}/employees/${id}`)
  }

  getEmployeeApi(id:any){
    return this.http.get(`${this.base_url}/employees/${id}`)
  }

  updateEmployee(id:any,data:any){
    return this.http.put(`${this.base_url}/employees/${id}`,data)
  }


}
