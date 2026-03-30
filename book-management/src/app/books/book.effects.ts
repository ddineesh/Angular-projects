import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "./book.service";
import { AddBook, AddBookFailure, AddBookSuccess, RemoveBook } from "./book.actions";
import { mergeMap,map, catchError, of } from "rxjs";

@Injectable()
export class BookEffects {

    addBook$ = createEffect(() => {
        return this.actions$.pipe(ofType(AddBook), mergeMap(action => this.bookService.addBook(action).pipe(
            map(book => AddBookSuccess({ id: book.id, title: book.title, author: book.author })),
            catchError(error => of(AddBookFailure({ error })))
        )));
    });

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}

}