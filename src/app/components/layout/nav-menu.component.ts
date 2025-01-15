import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  template: `
    <p-menubar [model]="items">
      <ng-template pTemplate="end">
        <div *ngIf="authService.isAuthenticated()" class="flex gap-2">
          <span class="text-sm">Welcome, {{userName}}</span>
          <button 
            class="p-button-text p-button-sm" 
            (click)="logout()"
          >
            Logout
          </button>
        </div>
      </ng-template>
    </p-menubar>
  `
})
export class NavMenuComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/']
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: ['/profile']
    }
  ];

  userName: string = '';

  constructor(public authService: AuthService) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user?.user?.name || '';
  }

  logout() {
    this.authService.logout();
  }
}