import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalModule } from '@coreui/angular';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import {MaterialModule} from './material/material.module';
import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 import { InterceptorInterceptor } from 'src/app/services/interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination'
import { MatDialogModule } from "@angular/material/dialog";
import { AuthGuardService } from './services/auth-guard.service';
import { NgxOtpInputModule } from 'ngx-otp-input';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    TabsModule,
    ListGroupModule,
    HttpClientModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    MaterialModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    NgxPaginationModule,
    MatDialogModule,
    ModalModule,
    NgxOtpInputModule
  ],
  
  providers: [

    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    },
    IconSetService,
    Title,
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {
}
