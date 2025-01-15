import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ButtonModule, InputTextModule, CardModule],
  template: `
    <div class="container">
      <div class="flex justify-content-center">
        <p-card header="Register" [style]="{ width: '360px' }">
          <div class="flex flex-column gap-2">
            <div class="p-float-label">
              <input pInputText id="name" [(ngModel)]="name" />
              <label for="name">Name</label>
            </div>
            <div class="p-float-label">
              <input pInputText id="email" [(ngModel)]="email" />
              <label for="email">Email</label>
            </div>
            <div class="p-float-label">
              <input pInputText id="password" type="password" [(ngModel)]="password" />
              <label for="password">Password</label>
            </div>
            <p-button label="Register" (onClick)="onRegister()" [style]="{ width: '100%' }"></p-button>
            <a [routerLink]="['/login']">Already have an account? Login</a>
          </div>
        </p-card>
      </div>
    </div>
  `
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }
}