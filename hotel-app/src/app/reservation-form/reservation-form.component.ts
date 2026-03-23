import { Component,OnInit, reflectComponentType } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder, 
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      noofGuests: ['', Validators.required],
      roomNumber: ['', Validators.required],  
      roomType: ['', Validators.required]
    });
      let reservationId = this.route.snapshot.paramMap.get('id');
      if (reservationId) {
        this.reservationService.getReservation(Number(reservationId))?.subscribe(res => {
          console.log('Fetched Reservation from SVC:', res);
          if(res) {
            console.log('Fetched Reservation from SVC inside:', res);
            this.reservationForm.patchValue(res[0]);
          }
        });
      }
  }

  onSubmit() {
    let reservation: Reservation = this.reservationForm.value
    if (this.reservationForm.valid) {
      let reservationId = this.route.snapshot.paramMap.get('id');
     
      if(reservationId) {
        let updatedReservation: Reservation = this.reservationForm.value;
        updatedReservation.id = Number(reservationId);
        // this.reservationService.updateReservation(Number(reservationId), updatedReservation);
        this.reservationService.updateReservation(Number(reservationId), updatedReservation).subscribe((res) => {
          console.log('Updated Reservation :', res);
        });
      } else {
      this.reservationService.createReservation(reservation).subscribe(() => {
        console.log('Created Reservation :', reservation);
      }); 
    } 
    this.router.navigate(['/list']);
  } 

} 
  
}
