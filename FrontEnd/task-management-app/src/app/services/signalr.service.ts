import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;

  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/taskhub`)
      .build();
  }
  public startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }
  taskDeleted(taskId: number) {
    this.hubConnection.invoke('TaskDeleted', taskId)
      .then(() => console.log(`TaskDeleted event sent: ${taskId}`))
      .catch(err => console.error(`Error while sending TaskDeleted event: ${err}`));
  }

  taskDeletedListener(): Observable<number> {
    debugger;
    return new Observable<number>(observer => {
      this.hubConnection.on('TaskDeleted', (taskId: number) => {
        observer.next(taskId);
      });
    });
  }

  taskUpdated(taskId: number) {
    this.hubConnection.invoke('TaskUpdated', taskId)
      .then(() => console.log(`TaskUpdated event sent: ${taskId}`))
      .catch(err => console.error(`Error while sending TaskUpdated event: ${err}`));
  }
  taskUpdatedListener(): Observable<number> {
    return new Observable<number>(observer => {
      this.hubConnection.on('TaskUpdated', (taskId: number) => {
        observer.next(taskId);
      });
    });
  }
}
