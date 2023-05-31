import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public hubConnection!: signalR.HubConnection ;


  constructor() {
    try {
       this.listenForTaskDeleted();
       this.listenForTaskUpdated();
      this.listenForTaskCreated();
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/taskhub`)
        .build();
    } catch (error) {
      console.error(`Error while creating SignalR hub connection: ${error}`);
    }
  }

  public startConnection() {
    try {
      if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
        this.hubConnection.start()
          .then(() => console.log('SignalR connection started'))
          .catch(err => console.error('Error while starting SignalR connection: ' + err));
      }
    } catch (error) {
      console.error(`Error while starting SignalR hub connection: ${error}`);
    }
  }

  public stopConnection = () => {
    try {
      this.hubConnection
        .stop()
        .then(() => console.log('Connection stopped'))
        .catch(err => console.log('Error while stopping connection: ' + err));
    } catch (error) {
      console.error(`Error while stopping SignalR hub connection: ${error}`);
    }
  }

  taskDeleted(taskId: number) {
    try {
      this.hubConnection.invoke('TaskDeleted', taskId)
        .then(() => console.log(`TaskDeleted event sent: ${taskId}`))
        .catch(err => console.error(`Error while sending TaskDeleted event: ${err}`));
    } catch (error) {
      console.error(`Error while invoking TaskDeleted on SignalR hub connection: ${error}`);
    }
  }

  taskDeletedListener(): Observable<number> {
    try {
      return new Observable<number>(observer => {
        this.hubConnection.on('TaskDeleted', (taskId: number) => {
          observer.next(taskId);
        });
      });
    } catch (error) {
      console.error(`Error while listening for TaskDeleted event on SignalR hub connection: ${error}`);
      return new Observable<number>();
    }
  }

  taskUpdated(taskId: number) {
    try {
      this.hubConnection.invoke('TaskUpdated', taskId)
        .then(() => console.log(`TaskUpdated event sent: ${taskId}`))
        .catch(err => console.error(`Error while sending TaskUpdated event: ${err}`));
    } catch (error) {
      console.error(`Error while invoking TaskUpdated on SignalR hub connection: ${error}`);
    }
  }

  taskUpdatedListener(): Observable<number> {
    try {
      return new Observable<number>(observer => {
        this.hubConnection.on('TaskUpdated', (taskId: number) => {
          observer.next(taskId);
        });
      });
    } catch (error) {
      console.error(`Error while listening for TaskUpdated event on SignalR hub connection: ${error}`);
      return new Observable<number>();
    }
  }

  taskCreated() {
    debugger;
    try {
      this.hubConnection.invoke('TaskCreated')
        .then(() => console.log(`TaskCreated event sent.`))
        .catch(err => console.error(`Error while sending TaskCreated event: ${err}`));
    } catch (error) {
      console.error(`Error while invoking TaskCreated on SignalR hub connection: ${error}`);
    }
  }

  taskCreatedListener(): Observable<number> {
    debugger;
    try {
      return new Observable<number>(observer => {
        this.hubConnection.on('TaskCreated', () => {
          observer.next();
        });
      });
    } catch (error) {
      console.error(`Error while listening for TaskCreated event on SignalR hub connection: ${error}`);
      return new Observable<number>();
    }
  }
  public listenForTaskCreated(): void {
    debugger;
    this.taskCreatedListener().subscribe(taskId => {
      alert(`TaskCreated event received: ${taskId}`);

    });
  }

  public listenForTaskDeleted(): void {
    debugger;
    this.taskDeletedListener().subscribe((taskId: number) => {
            alert(`TaskDeleted event received: ${taskId}`);
        });
}
public listenForTaskUpdated(): void {
  debugger;
  this.taskUpdatedListener().subscribe(taskId => { alert(`TaskUpdated event received: ${taskId}`);
});
}


}