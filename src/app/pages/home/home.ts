import { Component } from '@angular/core';
import { TaskList } from '../task-list/task-list';

@Component({
  imports: [TaskList],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
