import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule, ToastModule],
  providers: [MessageService],
  template: `
    <div class="container">
      <p-card header="Profile">
        <div class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label htmlFor="name">Name</label>
            <input 
              pInputText 
              id="name" 
              [(ngModel)]="user.name"
              [ngClass]="{'ng-invalid ng-dirty': submitted && !user.name}"
            />
            <small class="p-error" *ngIf="submitted && !user.name">
              Name is required
            </small>
          </div>

          <div class="flex flex-column gap-2">
            <label htmlFor="email">Email</label>
            <input 
              pInputText 
              id="email" 
              [(ngModel)]="user.email"
              [ngClass]="{'ng-invalid ng-dirty': submitted && !user.email}"
            />
            <small class="p-error" *ngIf="submitted && !user.email">
              Email is required
            </small>
          </div>

          <div class="flex flex-column gap-2">
            <label htmlFor="password">New Password (optional)</label>
            <input 
              pInputText 
              type="password"
              id="password" 
              [(ngModel)]="newPassword"
            />
          </div>

          <div class="flex justify-content-end">
            <p-button 
              label="Save Changes"
              (onClick)="onSubmit()"
              [loading]="loading"
            ></p-button>
          </div>
        </div>
      </p-card>
    </div>
    <p-toast></p-toast>
  `
})
export class ProfileComponent implements OnInit {
  user: any = {
    name: '',
    email: ''
  };
  newPassword: string = '';
  loading = false;
  submitted = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load profile'
        });
        this.loading = false;
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.user.name || !this.user.email) {
      return;
    }

    this.loading = true;
    const updateData = {
      ...this.user,
      ...(this.newPassword ? { password: this.newPassword } : {})
    };

    this.userService.updateProfile(updateData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully'
        });
        this.loading = false;
        this.newPassword = '';
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update profile'
        });
        this.loading = false;
      }
    });
  }
}