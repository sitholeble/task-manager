import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Task, TaskRequest } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(title: string): Observable<Task> {
    const taskRequest: TaskRequest = {
      title: title,
      completed: false
    };
    return this.http.post<Task>(this.apiUrl, taskRequest);
  }

  updateTask(id: number, taskRequest: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, taskRequest);
  }

  toggleTask(id: number, completed: boolean): Observable<Task> {
    // First get the current task to preserve the title
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      switchMap(task => {
        const taskRequest: TaskRequest = {
          title: task.title,
          completed: completed
        };
        return this.http.put<Task>(`${this.apiUrl}/${id}`, taskRequest);
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
