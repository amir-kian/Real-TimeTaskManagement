import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalrService } from 'src/app/services/signalr.service';
import { TaskService } from 'src/app/services/task.service';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.less']
})
export class TaskCreateComponent implements OnInit, AfterViewInit {
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  ResultMessage = '';
  public showTaskCreatedMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private signalrService: SignalrService
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.signalrService.startConnection();
  }

  onSubmit() {
    debugger;
    if (this.taskForm.invalid) {
      return;
    }

    const newTask = this.taskForm?.value;

    this.taskService.createTask(newTask).subscribe(
      () => {
        this.ResultMessage = 'Task created successfully!';
        this.showTaskCreatedMessage = true;
        if (this.signalrService.hubConnection.state === HubConnectionState.Connected) {
          this.signalrService.taskCreated();
        }
      },
      (error) => {
        this.ResultMessage = 'Error creating task!';
        console.error(error);
      }
    );
  }

  get taskFormControls() {
    return this.taskForm.controls;
  }

  GoBackToList() {
    this.router.navigate(['/list']);
  }
}