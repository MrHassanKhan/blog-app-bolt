import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { PostListComponent } from './app/components/post/post-list.component';
import { PostFormComponent } from './app/components/post/post-form.component';
import { PostDetailComponent } from './app/components/post/post-detail.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { authGuard } from './app/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'posts',
    component: PostListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'posts/create',
    component: PostFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'posts/edit/:id',
    component: PostFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'posts/:id',
    component: PostDetailComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});