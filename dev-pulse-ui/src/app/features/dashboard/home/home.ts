import { Component, computed, effect, signal } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor() {
    effect(() => {
      console.log('Filtered Tasks:', this.filteredTasks());
    }); 
  }
  authService = inject(AuthService);
  private router = inject(Router);

  task = signal([
    { id :1, title: 'One', description: 'Description for 1' },
    { id: 2, title: 'Two', description: 'Description for 2' },
    { id: 3, title: 'Three', description: 'Description for 3' }
  ])


  searchTerm = signal('');

  filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.task().filter(task => task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term));
  }
  );
  addTask() {
    this.task.update(tasks => [
      ...tasks,
      {
        id: Date.now(),
        title: 'New Task',
        description: 'Desciption for ' + (Number(tasks.length) + 1)
      }
    ]);
  }
  removeTask(index:number) {
    this.task.update(tasks => tasks.filter((_, i) => i !== index));
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
