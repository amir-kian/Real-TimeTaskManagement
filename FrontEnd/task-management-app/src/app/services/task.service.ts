import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  getTasks(): Observable<TaskModel[]> {
    return this._http.get<TaskModel[]>(`${environment.apiUrl}/api/Task/GetTasks`);
  }

  getTask(id: number): Observable<TaskModel> {
    return this._http.get<TaskModel>(`${environment.apiUrl}/api/Task/GetTask/${id}`);
  }

  createTask(task: TaskModel): Observable<TaskModel> {
    debugger;
    return this._http.post<TaskModel>(`${environment.apiUrl}/api/Task/CreateTask`, task);
  }

  updateTask(task: TaskModel): Observable<void> {
    return this._http.put<void>(`${environment.apiUrl}/api/Task/UpdateTask/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/api/Task/DeleteTask/${id}`);
  }

}