import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { TextfieldComponent } from './components/textfield/textfield.component';
import { RadioComponent } from './components/radio/radio.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LabelComponent } from './components/label/label.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ContentEditableFormDirective } from './directives/content-editable-form.directive';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { TextareaComponent } from './components/textarea/textarea.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { CommentsComponent } from './components/comments/comments.component';
import { LogsComponent } from './components/logs/logs.component';
import { CommentEditableDirective } from './directives/comment-editable.directive';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';

@NgModule({
  declarations: [
    FormModalComponent,
    StatusFilterComponent,
    CustomCarouselComponent,
    TableViewComponent,
    DashboardCarouselComponent,
    ConfirmboxComponent,
    TextfieldComponent,
    RadioComponent,
    DropdownComponent,
    LabelComponent,
    ContentEditableFormDirective,
    TextareaComponent,
    CheckboxComponent,
    CustomDropdownComponent,
    CommentsComponent,
    LogsComponent,
    CommentEditableDirective,
    SingleCommentComponent
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
    MaterialModule,
    MatSlideToggleModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ClipboardModule,
    NgComponentOutlet,
    CKEditorModule,
    TextFieldModule,
    NgxOtpInputModule,
    ClickOutsideModule
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
    DashboardCarouselComponent,
    MatSlideToggleModule,
    MatStepperModule,
    ConfirmboxComponent,
    TextfieldComponent,
    RadioComponent,
    DropdownComponent,
    LabelComponent,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    NgComponentOutlet,
    ClipboardModule,
    CKEditorModule,
    TextFieldModule,
    ContentEditableFormDirective,
    NgxOtpInputModule,
    TextareaComponent,
    CheckboxComponent,
    CustomDropdownComponent,
    ClickOutsideModule,
    CommentsComponent,
    LogsComponent,
    CommentEditableDirective,
    SingleCommentComponent
  ]
})
export class SharedModules { }
