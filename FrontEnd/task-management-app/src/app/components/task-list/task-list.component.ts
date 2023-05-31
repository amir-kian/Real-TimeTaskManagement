import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task';
import { TaskService } from '../../services/task.service';
import { SignalrService  } from '../../services/signalr.service';
import { HubConnectionState } from '@microsoft/signalr';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit,AfterViewInit  {

  constructor(private taskService: TaskService,private signalRService: SignalrService) { }


  tasks: TaskModel[] | undefined;
  public showTaskDeletedMessage = false;
  public showTaskUpdatedMessage = false;
  public showTaskCreatedMessage = false;




  ngOnInit(): void {

    this.taskService.getTasks().subscribe((data: TaskModel[]) => {
      this.tasks = data;
    });
  }
  ngAfterViewInit(): void {
       this.signalRService.startConnection();
       console.log("this.signalRService.hubConnection.state ",this.signalRService.hubConnection.state );

  }
  deleteTask(taskId: number) {
    debugger;
    if (confirm('Are you sure you want to delete this task?')) {

      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks!.filter(task => task.id !== taskId);

      });
    
      if (this.signalRService.hubConnection.state === HubConnectionState.Connected) {
        this.signalRService.taskDeleted(taskId);

      }
    }
  }




}
