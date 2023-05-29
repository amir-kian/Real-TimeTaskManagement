import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from 'src/app/models/task';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}


  ngOnInit() {
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

  onSubmit() {
    const taskData = this.taskForm.value;
    taskData.id = this.task.id;
    this.taskService.updateTask(taskData).subscribe(
      () => {
        this.ResultMessage = 'Task updated successfully';
      },
      () => {
        this.ResultMessage = 'Failed to update task';
      }
    );
  }
  GoBackToList() {
    this.router.navigate(['/list']);
  }

}
