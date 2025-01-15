import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, ProgressSpinnerModule, ToastModule],
  providers: [MessageService],
  template: `
    <div class="container">
      <div class="flex justify-content-between align-items-center mb-4">
        <h1 class="text-3xl font-bold">Blog Posts</h1>
        <p-button label="Create Post" routerLink="/posts/create"></p-button>
      </div>

      <div *ngIf="loading" class="flex justify-content-center">
        <p-progressSpinner></p-progressSpinner>
      </div>

      <p-table 
        *ngIf="!loading"
        [value]="posts" 
        [paginator]="true" 
        [rows]="10"
        [showCurrentPageReport]="true"
        responsiveLayout="scroll"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-post>
          <tr>
            <td>{{post.title}}</td>
            <td>{{post.author.name}}</td>
            <td>{{post.createdAt | date}}</td>
            <td>
              <div class="flex gap-2">
                <p-button 
                  icon="pi pi-eye" 
                  [rounded]="true" 
                  [text]="true"
                  [routerLink]="['/posts', post.id]"
                ></p-button>
                <p-button 
                  *ngIf="post.author.id === currentUserId"
                  icon="pi pi-pencil" 
                  [rounded]="true" 
                  [text]="true"
                  [routerLink]="['/posts/edit', post.id]"
                ></p-button>
                <p-button 
                  *ngIf="post.author.id === currentUserId"
                  icon="pi pi-trash" 
                  [rounded]="true" 
                  [text]="true"
                  severity="danger"
                  (onClick)="deletePost(post.id)"
                ></p-button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
    <p-toast></p-toast>
  `
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  loading = true;
  currentUserId: number;

  constructor(
    private postService: PostService,
    private messageService: MessageService
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUserId = user?.user?.id;
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load posts'
        });
        this.loading = false;
      }
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Post deleted successfully'
        });
        this.loadPosts();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete post'
        });
      }
    });
  }
}