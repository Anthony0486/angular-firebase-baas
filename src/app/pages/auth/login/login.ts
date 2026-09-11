import { Component } from '@angular/core';
import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';
// Import direct du service Auth et de la fonction de connexion Firebase
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  // Injection directe du service Auth de Firebase
  private auth = inject(Auth);
  private router = inject(Router);

  // Signals réactifs pour le formulaire
  email = signal<string>('');
  password = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  async onLogin(): Promise<void> {
    const userEmail = this.email().trim();
    const userPassword = this.password().trim();

    if (!userEmail || !userPassword) {
      this.errorMessage.set('Veuillez remplir tous les champs.');
      return;
    }

    try {
      this.isLoading.set(true);
      this.errorMessage.set('');

      // Connexion directe via l'API Firebase
      await signInWithEmailAndPassword(this.auth, userEmail, userPassword);

      // Redirection vers le dashboard après succès
      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage.set(this.formatFirebaseError(error.code));
    } finally {
      this.isLoading.set(false);
    }
  }

  private formatFirebaseError(code: string): string {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Email ou mot de passe incorrect.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives échouées. Réessayez plus tard.';
      default:
        return 'Une erreur est survenue lors de la connexion.';
    }
  }
}
