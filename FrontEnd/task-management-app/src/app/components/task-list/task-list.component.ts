import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  tasks: TaskModel[] | undefined;


  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: TaskModel[]) => {
      this.tasks = data;
    });
  }
  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks!.filter(task => task.id !== taskId);
      });
    }
  }

}
