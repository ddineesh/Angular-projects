import { Component } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';  
import { Reservation } from '../models/reservation';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      console.log('Fetched Reservations:', this.reservations);
    }); // Refresh the list after deletion
  } 

  // deleteReservation(id: number): void {
  //   this.reservationService.deleteReservation(id);
  //   // this.reservations = this.reservationService.getReservations(); // Refresh the list after deletion
  // }

  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log(`Invoked Delete reservation  with ID: ${id}`);
    });
    // this.reservations = this.reservationService.getReservations(); // Refresh the list after deletion
    } 
    }
