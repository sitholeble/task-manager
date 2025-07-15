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

  constructor(private taskService: TaskService) {
    console.log('TaskFormComponent: Constructor called - component loaded');
  }

  addTask(): void {
    console.log('TaskFormComponent: addTask() method called');
    console.log('TaskFormComponent: Current title value:', this.title);
    
    if (this.title.trim()) {
      console.log('TaskFormComponent: Title is valid, calling service...');
      this.taskService.addTask(this.title).subscribe({
        next: (task) => {
          console.log('TaskFormComponent: Task added successfully:', task);
          this.title = '';
          this.taskAdded.emit();
        },
        error: (error: any) => {
          console.error('TaskFormComponent: Error adding task:', error);
        }
      });
    } else {
      console.log('TaskFormComponent: Title is empty, not adding task');
    }
  }
}
