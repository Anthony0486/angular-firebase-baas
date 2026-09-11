import { Component } from '@angular/core';
import { inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// Import direct du service Auth et de la fonction de création de compte Firebase
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
@Component({
 imports: [FormsModule, RouterLink],
 selector: 'app-register',
 styleUrl: './register.css',
 templateUrl: './register.html',
})
export class Register {
 private auth = inject(Auth);
 private router = inject(Router);

 // State du formulaire
 email = signal<string>('');
 password = signal<string>('');
 confirmPassword = signal<string>('');
 errorMessage = signal<string>('');
 isLoading = signal<boolean>(false);

 async onRegister(): Promise<void> {
   const userEmail = this.email().trim();
   const userPassword = this.password().trim();
   const confirm = this.confirmPassword().trim();

   // Validation locale basique
   if (!userEmail || !userPassword || !confirm) {
     this.errorMessage.set('Veuillez remplir tous les champs.');
     return;
   }

   if (userPassword !== confirm) {
     this.errorMessage.set('Les mots de passe ne correspondent pas.');
     return;
   }

   if (userPassword.length < 6) {
     this.errorMessage.set('Le mot de passe doit contenir au moins 6 caractères.');
     return;
   }

   try {
     this.isLoading.set(true);
     this.errorMessage.set('');
     // Création de compte via l'API Firebase Auth
     await createUserWithEmailAndPassword(this.auth, userEmail, userPassword);

     // Redirection automatique vers le Dashboard une fois le compte créé
     await this.router.navigate(['/dashboard']);
   } catch (error: any) {
     this.errorMessage.set(this.formatFirebaseError(error.code));
   } finally {
     this.isLoading.set(false);
   }
 }

 private formatFirebaseError(code: string): string {
   switch (code) {
     case 'auth/email-already-in-use':
       return 'Cet email est déjà utilisé par un autre compte.';
     case 'auth/invalid-email':
       return 'Adresse email invalide.';
     case 'auth/weak-password':
       return 'Le mot de passe est trop faible.';
     default:
       return 'Une erreur est survenue lors de l\'inscription.';
   }
 }
}

