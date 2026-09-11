import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Database, ref, listVal } from '@angular/fire/database';
import { push, remove, set, ref as dbRef } from 'firebase/database';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
 providedIn: 'root',
})
export class TaskService {
 private db = inject(Database);
 private injector = inject(EnvironmentInjector);

 getTasks(): Observable<Task[]> {
   const tasksRef = ref(this.db, 'tasks');
   return listVal<Task>(tasksRef, { keyField: 'id' });
 }

 async addTask(title: string): Promise<void> {
   const tasksRef = dbRef(this.db, 'tasks');
   const newTaskRef = push(tasksRef);

   const newTask: Task = {
     title: title.trim(),
     completed: false,
   };

   await set(newTaskRef, newTask);
 }

 async deleteTask(taskId: string): Promise<void> {
   // Encapsulation dans le contexte d'injection pour stabiliser Zoneless
   return runInInjectionContext(this.injector, async () => {
     const taskRef = dbRef(this.db, `tasks/${taskId}`);
     await remove(taskRef);
   });
 }
}
