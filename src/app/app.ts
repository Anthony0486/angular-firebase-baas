import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home';
import { Header } from './layout/header/header'
import { Register } from './pages/auth/register/register'
import { Dashboard } from './pages/auth/dashboard/dashboard'
import { Login } from './pages/auth/login/login'


@Component({
  imports: [RouterOutlet, Home, Header, Register, Dashboard, Login],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('tmp-angular');
}
