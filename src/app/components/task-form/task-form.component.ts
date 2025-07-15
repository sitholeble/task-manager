import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [FormsModule],
  standalone: true
})
export class TaskFormComponent {
  title: string = '';
  @Output() taskAdded = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  addTask(): void {
    console.log('addTask() method called with title:', this.title);
    if (this.title.trim()) {
      console.log('Adding task to service...');
      this.taskService.addTask(this.title).subscribe({
        next: (task) => {
          console.log('Task added successfully:', task);
          this.title = '';
          this.taskAdded.emit(); // Notify parent to refresh tasks
        },
        error: (error: any) => {
          console.error('Error adding task:', error);
        }
      });
    } else {
      console.log('Title is empty, not adding task');
    }
  }
}
