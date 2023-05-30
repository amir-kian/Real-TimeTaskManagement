import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task';
import { TaskService } from '../../services/task.service';
import { SignalrService  } from '../../services/signalr.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService,private signalRService: SignalrService) { }

  tasks: TaskModel[] | undefined;
  public showTaskDeletedMessage = false;


  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: TaskModel[]) => {
      this.tasks = data;
    });
    this.signalRService.startConnection();

  }
  deleteTask(taskId: number) {
    debugger;
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks!.filter(task => task.id !== taskId);
        this.signalRService.taskDeleted(taskId);

      });
    }
  }

  public listenForTaskDeleted(): void {
    debugger;
    this.signalRService.taskDeletedListener()
        .subscribe((taskId: number) => {
            console.log(`TaskDeleted event received: ${taskId}`);
            this.showTaskDeletedMessage = true;
        });
}

}
