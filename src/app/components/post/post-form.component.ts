import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="container">
      <p-card [header]="isEditing ? 'Edit Post' : 'Create Post'">
        <div class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label htmlFor="title">Title</label>
            <input 
              pInputText 
              id="title" 
              [(ngModel)]="post.title"
              [ngClass]="{'ng-invalid ng-dirty': submitted && !post.title}"
            />
            <small class="p-error" *ngIf="submitted && !post.title">
              Title is required
            </small>
          </div>

          <div class="flex flex-column gap-2">
            <label htmlFor="content">Content</label>
            <textarea 
              pInputTextarea 
              id="content" 
              [(ngModel)]="post.content"
              [rows]="10"
              [ngClass]="{'ng-invalid ng-dirty': submitted && !post.content}"
            ></textarea>
            <small class="p-error" *ngIf="submitted && !post.content">
              Content is required
            </small>
          </div>

          <div class="flex justify-content-end gap-2">
            <p-button 
              label="Cancel" 
              severity="secondary" 
              [text]="true"
              routerLink="/posts"
            ></p-button>
            <p-button 
              [label]="isEditing ? 'Update' : 'Create'"
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
export class PostFormComponent implements OnInit {
  post: any = {
    title: '',
    content: ''
  };
  isEditing = false;
  loading = false;
  submitted = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.loadPost(id);
    }
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

  onSubmit() {
    this.submitted = true;

    if (!this.post.title || !this.post.content) {
      return;
    }

    this.loading = true;
    const request = this.isEditing
      ? this.postService.updatePost(this.post.id, this.post)
      : this.postService.createPost(this.post);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Post ${this.isEditing ? 'updated' : 'created'} successfully`
        });
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to ${this.isEditing ? 'update' : 'create'} post`
        });
        this.loading = false;
      }
    });
  }
}