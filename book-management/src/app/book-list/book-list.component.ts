import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { AddBook, AddBookSuccess, RemoveBook } from '../books/book.actions';
import { AppState } from '../app.state';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  books$: Observable<Book[]>;

  constructor(private store: Store<AppState>) {
    this.books$ = store.pipe(select('book'));
  }

  addBook(id: string, title: string, author: string) {
    console.log("Adding book in Component:", { id, title, author });
    this.store.dispatch(AddBookSuccess({ id, title, author }));
  }

  removeBook(bookId: string) {
    console.log("Removing book in Component:", { bookId });

    this.store.dispatch(RemoveBook({ bookId }));
  }

}
