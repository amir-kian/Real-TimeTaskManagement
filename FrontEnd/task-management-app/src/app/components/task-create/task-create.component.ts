import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalrService } from 'src/app/services/signalr.service';
import { TaskService } from 'src/app/services/task.service';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.less']
})
export class TaskCreateComponent implements OnInit,AfterViewInit {

  ResultMessage!: string ;
  taskForm!: FormGroup ;
  public showTaskCreatedMessage = false;


  constructor(private formBuilder: FormBuilder,private taskService: TaskService,private router: Router,private signalrService: SignalrService
    ) { 
    this.taskForm = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      dueDate: new FormControl(''),
      priority: new FormControl(''),
      status: new FormControl('')
    });
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      dueDate: new FormControl(''),
      priority: new FormControl(''),
      status: new FormControl('')
    });
  }

  ngAfterViewInit(): void {
    this.signalrService.startConnection();
  }

  onSubmit() {
    debugger;
    const newTask = this.taskForm?.value;
    this.taskService.createTask(newTask).subscribe(() => {
      this.ResultMessage = "Task created successfully!";
      if (this.signalrService.hubConnection.state === HubConnectionState.Connected) {
        this.signalrService.taskCreated(); // Call taskCreated() here
      }
    }, () => {
      this.ResultMessage = "Error creating task!";
    });
  }

  GoBackToList() {
    this.router.navigate(['/list']);
  }

}
