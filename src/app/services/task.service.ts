import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Task, TaskRequest } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    console.log('Fetching tasks from:', this.apiUrl);
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(title: string): Observable<Task> {
    const taskRequest: TaskRequest = {
      title: title,
      completed: false
    };
    console.log('Adding task:', taskRequest, 'to:', this.apiUrl);
    return this.http.post<Task>(this.apiUrl, taskRequest);
  }

  toggleTask(id: number): Observable<Task> {
    console.log('Toggling task with id:', id);
    // First get the current task to preserve the title
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      switchMap(task => {
        const taskRequest: TaskRequest = {
          title: task.title,
          completed: !task.completed
        };
        console.log('Updating task:', taskRequest, 'at:', `${this.apiUrl}/${id}`);
        return this.http.put<Task>(`${this.apiUrl}/${id}`, taskRequest);
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    console.log('Deleting task with id:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
