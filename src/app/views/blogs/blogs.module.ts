import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { SharedModules } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BlogsComponent } from './blogs/blogs.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule, CarouselModule, CollapseModule, DropdownModule, FormModule, GridModule, ListGroupModule, NavModule, PaginationModule, PlaceholderModule, PopoverModule, ProgressModule, SharedModule, SpinnerModule, TableModule, TabsModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialModule } from '../../material/material.module';
// import { MatDatepickerModule } from '@angular/material/datepicker'
// import { MatNativeDateModule } from '@angular/material/core'
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    BlogsComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    CommonModule,
    SharedModules,
    SharedModule,
    MatMenuModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    GridModule,
    CKEditorModule,
    MatFormFieldModule,
    MatInputModule,
   MatSelectModule,
   MatSelectModule,
   MatButtonModule,
   CommonModule,
   MatMenuModule,
   // MatIconModule,
   AccordionModule,
   BadgeModule,
   BreadcrumbModule,
   ButtonModule,
   CardModule,
   CarouselModule,
   CollapseModule,
   DropdownModule,
   FormModule,
   GridModule,
   ListGroupModule,
   NavModule,
   PaginationModule,
   PlaceholderModule,
   MatChipsModule,
   PopoverModule,
   ProgressModule,
   SharedModule,
   SpinnerModule,
   TableModule,
   TabsModule,
   TooltipModule,
   UtilitiesModule,
   FormsModule,
   CKEditorModule,
   ReactiveFormsModule,
   MaterialModule,
   MatInputModule,
   MatSelectModule,
   MatSelectModule,
   MatButtonModule,
   MatFormFieldModule,
   SharedModules,
   MatStepperModule
  ]
})

export class BlogsModule { }
