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
    return this._http.get<TaskModel[]>(`${environment.apiUrl}/Task/GetTasks`);
  }

  getTask(id: number): Observable<TaskModel> {
    return this._http.get<TaskModel>(`${environment.apiUrl}/Task/GetTask/${id}`);
  }

  createTask(task: TaskModel): Observable<TaskModel> {
    return this._http.post<TaskModel>(`${environment.apiUrl}/Task/CreateTask`, task);
  }

  updateTask(task: TaskModel): Observable<void> {
    return this._http.put<void>(`${environment.apiUrl}/Task/UpdateTask/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/Task/DeleteTask/${id}`);
  }

}