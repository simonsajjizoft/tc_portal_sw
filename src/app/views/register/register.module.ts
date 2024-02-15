import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModules } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModules
  ]
})
export class RegisterModule { }
