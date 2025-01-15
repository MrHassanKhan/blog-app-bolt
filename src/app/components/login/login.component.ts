import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ButtonModule, InputTextModule, CardModule],
  template: `
    <div class="container">
      <div class="flex justify-content-center">
        <p-card header="Login" [style]="{ width: '360px' }">
          <div class="flex flex-column gap-2">
            <div class="p-float-label">
              <input pInputText id="email" [(ngModel)]="email" />
              <label for="email">Email</label>
            </div>
            <div class="p-float-label">
              <input pInputText id="password" type="password" [(ngModel)]="password" />
              <label for="password">Password</label>
            </div>
            <p-button label="Login" (onClick)="onLogin()" [style]="{ width: '100%' }"></p-button>
            <a [routerLink]="['/register']">Don't have an account? Register</a>
          </div>
        </p-card>
      </div>
    </div>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
  }
}