import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from 'src/app/models/task';
import { SignalrService } from 'src/app/services/signalr.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.less']
})
export class TaskEditComponent implements OnInit {
  taskForm!: FormGroup;
  task!: TaskModel;
  ResultMessage!: string ;
  public showTaskUpdatedMessage = false;
  authenticated: boolean=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService,
    private signalrService: SignalrService
  ) {}


  ngOnInit() {
    this.CheckAuth();
   
    this.taskForm = this.fb.group({
      name: [''],
      description: [''],
      dueDate: [''],
      priority: [''],
      status: ['']
    });

    const taskId = this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(Number(taskId)).subscribe(task => {
      this.task = task;
      this.taskForm.patchValue(task);
    });
  }
  private CheckAuth() {
    const token = localStorage.getItem('token');
    if (token)
      this.authenticated = true;

    else
      this.router.navigateByUrl('/login');
  }

  onSubmit() {
    const taskData = this.taskForm.value;
    taskData.id = this.task.id;
    this.taskService.updateTask(taskData).subscribe(
      () => {
        this.ResultMessage = 'Task updated successfully';
        this.signalrService.taskUpdated(taskData.id);
      },
      () => {
        this.ResultMessage = 'Failed to update task';
      }
    );
  }
  public listenForTaskUpdated(): void {
    debugger;
    this.signalrService.taskUpdatedListener().subscribe(taskId => {
      console.log(`TaskUpdated event received: ${taskId}`);
      this.showTaskUpdatedMessage = true;
  });
}
  
  GoBackToList() {
    this.router.navigate(['/list']);
  }

}
