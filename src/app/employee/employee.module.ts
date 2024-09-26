import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { Routes,RouterModule } from '@angular/router';
import { SideComponent } from '../side/side.component';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';


export const routes:Routes=[
  {path:'',component:EmpListComponent},
  {path:'add',component:AddEmpComponent},
  {path:'edit/:id',component:EditEmpComponent},
]


@NgModule({
  declarations: [
    AddEmpComponent,
    EmpListComponent,
    EditEmpComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SideComponent,
    RouterLink,
    HttpClientModule,
    FormsModule,
    
  ]
})
export class EmployeeModule { }
