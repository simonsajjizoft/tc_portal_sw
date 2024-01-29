import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { SharedModules } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule, 
CarouselModule, CollapseModule, DropdownModule, FormModule, GridModule, SharedModule } from '@coreui/angular';






@NgModule({
  declarations: [AboutUsComponent],
  
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModules,
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
    SharedModule,
    // ListGroupModule,
    // NavModule,
    // PaginationModule,
    // PlaceholderModule,
    // MatChipsModule,
    // PopoverModule,
    // ProgressModule,
    // SharedModule,
    // SpinnerModule,
    // TableModule,
    // TabsModule,
    // TooltipModule,
    // UtilitiesModule,
    // FormsModule,
    CKEditorModule,
    // CreateBlogRoutingModule,
    // ReactiveFormsModule,
    // MaterialModule,
    // MatDatepickerModule,
    // MatInputModule,
    // MatSelectModule,
    // MatSelectModule,
    // MatButtonModule,
    // MatFormFieldModule,
  ],

})
export class AboutUsModule { }
