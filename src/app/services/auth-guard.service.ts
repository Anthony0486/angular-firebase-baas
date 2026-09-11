import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';
export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
 const auth = inject(Auth);
 const router = inject(Router);
 return new Observable<boolean | UrlTree>((observer) => {
   // authState(auth) écoute les changements d'état d'authentification
   const subscription = authState(auth).subscribe((user) => {
     if (user) {
       console.log('Utilisateur authentifié :', user.email);
       observer.next(true); //  Accès autorisé
     } else {
       console.log('Utilisateur non connecté -> Redirection /login');
       observer.next(router.createUrlTree(['/login'])); //  Redirection propre
     }
     // On ferme l'Observable pour valider le passage du Guard et éviter les fuites mémoire
     observer.complete();
   });
   // Nettoyage automatique si le Router annule la navigation
   return () => subscription.unsubscribe();
 });
};
