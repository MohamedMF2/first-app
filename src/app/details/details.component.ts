import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()"  >
        <label for="first-name" >First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email" >Email</label>
        <input id="email" type="email" formControlName="email">
        <button class="primary" type="submit">Apply now</button>
      </form>
    </section>
  </article>
`,
  styleUrls: ['./details.compoent.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  housingLocationId = -1;
  //service injection
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  // form object
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });


  constructor() {

    //async approch
    const housingLocationId = +this.route.snapshot.params['id']
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });

    /* sync approch constructor

   this.housingLocationId = Number(this.route.snapshot.params['id']);

   console.log(`
   {
     housingLocationId: ${this.housingLocationId} ,
     route:${this.route}
   }
   --DetailsComponent constructor --
   `);

   this.housingLocation = this.housingService.getHousingLocationById(this.housingLocationId);

   console.log(`
   {
     housingLocation: ${JSON.stringify(this.housingLocation)} ,
   }
   --DetailsComponent constructor --
   `);
 
 */
  }

  // on form submission
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }



}
