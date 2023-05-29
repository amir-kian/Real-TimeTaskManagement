import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.less']
})
export class TaskCreateComponent implements OnInit {

  isSaved: boolean = false;
  taskForm!: FormGroup ;


  constructor(private formBuilder: FormBuilder,private taskService: TaskService) { 
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
  onSubmit() {
    const newTask = this.taskForm?.value;
    this.taskService.createTask(newTask).subscribe(() => {
      this.isSaved = true;
    }, () => {
      this.isSaved = false;
    });
  }

}
