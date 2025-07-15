import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    console.log('TaskListComponent: Loading tasks...');
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        console.log('TaskListComponent: Tasks loaded successfully:', tasks);
        this.tasks = tasks;
      },
      error: (error: any) => {
        console.error('TaskListComponent: Error loading tasks:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
      }
    });
  }

  toggle(id: number): void {
    this.taskService.toggleTask(id).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (error) => {
        console.error('Error toggling task:', error);
      }
    });
  }

  delete(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }
}
