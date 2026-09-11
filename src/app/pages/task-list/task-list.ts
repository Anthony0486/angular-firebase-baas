import { Component, inject, signal, WritableSignal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

// Import nommé de l'interface Task
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
 selector: 'app-task-list',
 imports: [FormsModule],
 templateUrl: './task-list.html',
 styleUrl: './task-list.css',
})
export class TaskList {
 // 1. Injection du service TaskService
 private taskService = inject(TaskService);

newTaskTitle = signal<string>('');
 // 2. Signal réactif contenant le tableau de tâches typé (Task[])
 // toSignal convertit l'Observable<Task[]> du service en Signal<Task[]>
 tasks: Signal<Task[]> = toSignal(this.taskService.getTasks(), {
   initialValue: []
 });

 // 3. Action d'ajout
 async onAddTask(): Promise<void> {
   const title: string = this.newTaskTitle().trim();
   if (!title) return;

   await this.taskService.addTask(title);
   this.newTaskTitle.set(''); // Réinitialise le champ
 }

 // 4. Action de suppression avec le type de l'ID issu du modèle Task
 async onDeleteTask(id: Task['id']): Promise<void> {
   if (!id) return;
   await this.taskService.deleteTask(id);
 }
}
