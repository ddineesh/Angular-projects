import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiURL = "http://localhost:3000"
  private reservations: Reservation[] = [];

  // constructor() { 
  //   const storedReservations = localStorage.getItem('reservations');
  //   if (storedReservations) {
  //     this.reservations = JSON.parse(storedReservations);
  //   }
  // }

  constructor(private http: HttpClient) { } 
  //CRUD operations for reservations

  createReservation(reservation: Reservation): Observable<void> {
    // console.log('Reservation Details in Service:', reservation);
      // Here you can add logic to send the reservation details to a server or display a confirmation message
      reservation.id = this.reservations.length > 0 ? this.reservations[this.reservations.length - 1].id + 1 : 1; // Simple ID generation
      // this.reservations.push(reservation);
      // localStorage.setItem('reservations', JSON.stringify(this.reservations));
        return this.http.post<void>(`${this.apiURL}/reservation/${reservation.id}`, reservation);
    }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiURL}/reservations`);
  }

  getReservation(id: number): Observable<Reservation[]> | undefined {
    return this.http.get<Reservation[]>(`${this.apiURL}/reservation/${id}`);
  }

  updateReservation(id: number, updatedReservation: Reservation): Observable<void> {
    // const index = this.reservations.findIndex(res => res.id === id);
    // if (index !== -1) {
    //   this.reservations[index] = updatedReservation;
    // }
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));
    return this.http.put<void>(`${this.apiURL}/reservation/${id}`, updatedReservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/reservation/${id}`);
    // this.reservations = this.reservations.filter(res => res.id !== id);
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));  
  }

}
