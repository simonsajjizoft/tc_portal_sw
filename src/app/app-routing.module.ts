import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ForgotPasswordComponent } from './views/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'packages',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/packages/packages.module').then((m) => m.PackagesModule)
      },
      {
        path: 'templates',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/templates/templates.module').then((m) => m.TemplatesModule)
      },
      {
        path: 'exercises',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/exercises/exercises.module').then((m) => m.ExercisesModule)
      },          
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/home/home.module').then((m) => m.HomeModule)
      },     
      {
        path: 'pages',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'register',
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./views/register/register.module').then((m) => m.RegisterModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'register2',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'login',pathMatch:'full'}
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: "enabledNonBlocking",
      useHash: false 
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
