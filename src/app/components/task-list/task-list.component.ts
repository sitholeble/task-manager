import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TaskListComponent {
  constructor(private taskService: TaskService) {}

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  toggle (id: number) {
    this.taskService.toggleTask(id);
  }

  delete(id: number) {
    this.taskService.deleteTask(id);
  }

}
