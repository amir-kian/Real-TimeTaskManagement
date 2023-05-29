import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.less']
})
export class TaskDetailComponent implements OnInit {
  task: TaskModel | undefined;

  constructor(
    private Activerouter: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void{
    const id = this.Activerouter.snapshot.paramMap.get('id');
    this.taskService.getTask(Number(id))
      .subscribe(task => this.task = task);
  }
  GoBackToList() {
    this.router.navigate(['/list']);
  }

}
