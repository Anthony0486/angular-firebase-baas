import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.html',
  styleUrl: './observables.css'
})
export class Observables {
  private premiereSubscription: Subscription;
  laSource = interval(1000); //! L'observable c'est LUI !
  currentValue: number = 0; // Stocke la valeur courante

  constructor() {
    this.premiereSubscription = new Subscription(); // Initialisation ici
  }

  ngOnInit() {
    // Souscription à l'observable
    this.premiereSubscription = this.laSource.subscribe((count) => {
      console.log(count); // Affiche dans la console
      this.currentValue = count;
    });
  }

  ngOnDestroy() {
    // Résiliation de la souscription
    this.premiereSubscription.unsubscribe();
    console.log('Observable détruit');
  }
}
