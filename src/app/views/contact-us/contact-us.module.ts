import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { SharedModules } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule, CarouselModule, CollapseModule, DropdownModule, FormModule, GridModule, ListGroupModule, NavModule, PaginationModule, PlaceholderModule, PopoverModule, ProgressModule, SharedModule, SpinnerModule, TableModule, TabsModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialModule } from '../../material/material.module';
// import { MatDatepickerModule } from '@angular/material/datepicker'
// import { MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ContactUsRoutingModule,
    SharedModules,
    MatMenuModule, CommonModule,
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
    CKEditorModule
  ]
})
export class ContactUsModule { }
