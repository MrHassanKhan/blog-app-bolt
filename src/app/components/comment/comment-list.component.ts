import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextareaModule, ButtonModule, ToastModule],
  providers: [MessageService],
  template: `
    <div class="mt-4">
      <h3 class="text-xl font-semibold mb-3">Comments</h3>
      
      <div class="mb-4">
        <textarea 
          pInputTextarea 
          [(ngModel)]="newComment"
          placeholder="Write a comment..."
          [rows]="3"
          class="w-full"
        ></textarea>
        <div class="flex justify-content-end mt-2">
          <p-button 
            label="Post Comment"
            (onClick)="addComment()"
            [loading]="loading"
          ></p-button>
        </div>
      </div>

      <div class="flex flex-column gap-3">
        <div *ngFor="let comment of comments" class="p-3 border-round surface-ground">
          <div class="flex justify-content-between align-items-center mb-2">
            <span class="font-semibold">{{comment.author.name}}</span>
            <span class="text-sm text-500">{{comment.createdAt | date}}</span>
          </div>
          <p class="m-0">{{comment.content}}</p>
          <div *ngIf="currentUserId === comment.author.id" class="flex justify-content-end mt-2">
            <p-button 
              icon="pi pi-trash" 
              severity="danger"
              [text]="true"
              [rounded]="true"
              (onClick)="deleteComment(comment.id)"
            ></p-button>
          </div>
        </div>
      </div>
    </div>
    <p-toast></p-toast>
  `
})
export class CommentListComponent {
  @Input() postId!: number;
  comments: any[] = [];
  newComment: string = '';
  loading = false;
  currentUserId: number;

  constructor(
    private commentService: CommentService,
    private messageService: MessageService
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUserId = user?.user?.id;
  }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.postId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load comments'
        });
      }
    });
  }

  addComment() {
    if (!this.newComment.trim()) return;

    this.loading = true;
    this.commentService.createComment(this.postId, { content: this.newComment }).subscribe({
      next: () => {
        this.loadComments();
        this.newComment = '';
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add comment'
        });
        this.loading = false;
      }
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe({
      next: () => {
        this.loadComments();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Comment deleted successfully'
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete comment'
        });
      }
    });
  }
}