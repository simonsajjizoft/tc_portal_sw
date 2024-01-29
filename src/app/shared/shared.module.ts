import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule, CarouselModule, CollapseModule, DropdownModule, FormModule, GridModule, ListGroupModule, NavModule, PaginationModule, PlaceholderModule, PopoverModule, ProgressModule, SharedModule, SpinnerModule, TableModule, TabsModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import {MatChipsModule} from '@angular/material/chips';
import { ConfirmboxComponent } from './components/confirmbox/confirmbox.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { ModalModule } from '@coreui/angular';
import { TableViewComponent } from './components/table-view/table-view.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StatusFilterComponent } from './components/status-filter/status-filter.component';
import { MaterialModule } from '../material/material.module';
import { CustomCarouselComponent } from './components/custom-carousel/custom-carousel.component';
import { DashboardCarouselComponent } from './components/dashboard-carousel/dashboard-carousel.component';
@NgModule({
  declarations: [
    FormModalComponent,
    StatusFilterComponent,
    CustomCarouselComponent,
    TableViewComponent,
    DashboardCarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule, CarouselModule, CollapseModule, DropdownModule, FormModule, GridModule, ListGroupModule, NavModule, PaginationModule, PlaceholderModule, PopoverModule, ProgressModule, SharedModule, SpinnerModule, TableModule, TabsModule, TooltipModule, UtilitiesModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCheckboxModule,
    ModalModule,
    NgxPaginationModule,
    MaterialModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ModalModule,
    NgxPaginationModule,
    StatusFilterComponent,
    MaterialModule,
    CustomCarouselComponent,
    TableViewComponent,
    DashboardCarouselComponent
  ]
})
export class SharedModules { }
