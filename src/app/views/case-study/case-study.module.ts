import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudyRoutingModule } from './case-study-routing-module'
import { SharedModules } from '../../shared/shared.module';
import { AccordionModule, BreadcrumbModule, CardModule, CarouselModule, TableModule, ListGroupModule, NavModule, PaginationModule, PlaceholderModule, CollapseModule, DropdownModule, ButtonModule, FormModule, GridModule, SharedModule, BadgeModule } from '@coreui/angular';
import { CaseStudyComponent } from './case-study.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    CaseStudyComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CaseStudyRoutingModule,
    SharedModules,
    AccordionModule,
    CardModule,
    BreadcrumbModule,
    GridModule,
    FormModule,
    DropdownModule,
    MatFormFieldModule,
    BadgeModule,
    ButtonModule,
    CarouselModule,
    CollapseModule,
    ListGroupModule,
    NavModule,
    PaginationModule,
    PlaceholderModule,
    MatIconModule,
    TableModule,
    MaterialModule,
    MatSortModule,
    MatChipsModule,
    CKEditorModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule

  ]
})
export class CaseStudyModule { }
