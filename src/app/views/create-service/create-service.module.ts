import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateServiceRoutingModule } from './create-service-routing.module';
import { CreateServiceComponent } from './create-service.component';
import { ListingServiceComponent } from './listing-service/listing-service.component';
import { BreadcrumbModule,FormModule } from '@coreui/angular';
import { SharedModules } from 'src/app/shared/shared.module';
import { ButtonModule } from '@coreui/angular';
import  { CKEditorModule }from '@ckeditor/ckeditor5-angular';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


import { AccordionModule, BadgeModule, CardModule, CarouselModule, CollapseModule, DropdownModule, GridModule, ListGroupModule, NavModule, PaginationModule, PlaceholderModule, PopoverModule, ProgressModule, SharedModule, SpinnerModule, TableModule, TabsModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import {MatChipsModule} from '@angular/material/chips';
import { MaterialModule } from '../../material/material.module';
// import { MatDatepickerModule } from '@angular/material/datepicker'
// import { MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
 import { MatFormFieldModule } from '@angular/material/form-field';

 import { MatMenuModule } from '@angular/material/menu';
import { EditingServicePageComponent } from './editing-service-page/editing-service-page.component';


 @NgModule({
  declarations: [
    CreateServiceComponent,
    ListingServiceComponent,
    EditingServicePageComponent,
  
  ],
 
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    CreateServiceRoutingModule,MatChipsModule,MaterialModule,
    AccordionModule, BadgeModule, CardModule, CarouselModule, CollapseModule,
    DropdownModule, GridModule, ListGroupModule, NavModule, PaginationModule,
    PlaceholderModule, PopoverModule, ProgressModule, SharedModule, SpinnerModule, 
    TableModule, TabsModule, TooltipModule, UtilitiesModule ,
    SharedModules,
    BreadcrumbModule,
    ButtonModule,
    FormModule,
    CKEditorModule,
    MatSortModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class CreateServiceModule { }



// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CreateServiceRoutingModule } from './create-service-routing.module';
// import { CreateServiceComponent } from './create-service.component';
// import { ListingServiceComponent } from './listing-service/listing-service.component';
// import { BreadcrumbModule,FormModule } from '@coreui/angular';
// import { SharedModules } from 'src/app/shared/shared.module';
// import { ButtonModule } from '@coreui/angular';
// import  { CKEditorModule }from '@ckeditor/ckeditor5-angular';
// import { MatSortModule } from '@angular/material/sort';
// import { ListingpageModule } from '../listingpage/listingpage.module';
// import { MatTableModule } from '@angular/material/table';

// @NgModule({
//   declarations: [
//     CreateServiceComponent,
//     ListingServiceComponent,
    
//   ],
//   imports: [
//     ListingpageModule,
//     CommonModule,
//     MatTableModule,
//     CreateServiceRoutingModule,
//     SharedModules,
//     BreadcrumbModule,
//     ButtonModule,
//     FormModule,
//     CKEditorModule,
//     MatSortModule

//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
// })
// export class CreateServiceModule { }
