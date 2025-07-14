import { Component } from '@angular/core';
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

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.title.trim()) {
      this.taskService.addTask(this.title);
      this.title = '';
    }
  }

}
