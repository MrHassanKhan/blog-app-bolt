import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, ProgressSpinnerModule, ToastModule],
  providers: [MessageService],
  template: `
    <div class="container">
      <div *ngIf="loading" class="flex justify-content-center">
        <p-progressSpinner></p-progressSpinner>
      </div>

      <div *ngIf="!loading && post">
        <p-card>
          <ng-template pTemplate="header">
            <div class="flex justify-content-between align-items-center p-4">
              <h1 class="text-3xl font-bold m-0">{{post.title}}</h1>
              <div class="flex gap-2">
                <p-button 
                  label="Back" 
                  icon="pi pi-arrow-left" 
                  [text]="true"
                  routerLink="/posts"
                ></p-button>
                <p-button 
                  *ngIf="post.author.id === currentUserId"
                  label="Edit" 
                  icon="pi pi-pencil"
                  [routerLink]="['/posts/edit', post.id]"
                ></p-button>
              </div>
            </div>
          </ng-template>

          <div class="mb-4">
            <p class="text-sm text-gray-600">
              By {{post.author.name}} | {{post.createdAt | date}}
            </p>
          </div>

          <div class="whitespace-pre-wrap">{{post.content}}</div>
        </p-card>
      </div>
    </div>
    <p-toast></p-toast>
  `
})
export class PostDetailComponent implements OnInit {
  post: any = null;
  loading = true;
  currentUserId: number;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUserId = user?.user?.id;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadPost(id);
  }

  loadPost(id: number) {
    this.loading = true;
    this.postService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load post'
        });
        this.loading = false;
      }
    });
  }
}