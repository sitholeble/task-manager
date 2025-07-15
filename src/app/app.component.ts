import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'task-manager';
  @ViewChild(TaskListComponent) taskList!: TaskListComponent;

  onTaskAdded(): void {
    if (this.taskList) {
      this.taskList.loadTasks();
    }
  }
}
