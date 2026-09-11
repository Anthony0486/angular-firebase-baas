import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Imports du SDK Firebase officiel
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// 2. Import des Tokens d'injection de @angular/fire !
import { Database } from '@angular/fire/database';

import { environment } from '../environments/environment';

// Initialisation synchrone de Firebase au démarrage de l'application
const app = initializeApp(environment.firebaseConfig);

export const appConfig: ApplicationConfig = {
 providers: [
   provideZonelessChangeDetection(),
   provideRouter(routes),

   // On associe les tokens @angular/fire aux instances réelles
   { provide: Database, useValue: getDatabase(app) },
 ],
};
