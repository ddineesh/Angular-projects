import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  addBook(book: Book): Observable<Book> {
    console.log("BookService: Adding book...", book);
    if (book.title && book.author) {
      return of(book);
    } else {
      return throwError(() => new Error("Invalid book data"));
    }
  }

  removeBook(bookId: string): Observable<string> {
    console.log("BookService: Removing book with ID...", bookId);
    if (bookId) {
      return of(bookId);
    } else {
      return throwError(() => new Error("Invalid book ID"));
    }
  }
}
