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
    if (this.title.trim()) {
      this.taskService.addTask(this.title).subscribe({
        next: () => {
          this.title = '';
          this.taskAdded.emit(); // Notify parent to refresh tasks
        },
        error: (error) => {
          console.error('Error adding task:', error);
        }
      });
    }
  }
}
