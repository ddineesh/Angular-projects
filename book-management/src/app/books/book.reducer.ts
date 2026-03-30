import { createReducer, on } from "@ngrx/store";
import { AddBook, RemoveBook, AddBookFailure, AddBookSuccess } from "./book.actions";
import { Book } from "../models/book";
import { state } from "@angular/animations";

export const initialState: Book[] = [];

export const bookReducer = createReducer(
  initialState,
  on(AddBook, (state) => { console.log("Adding book..."); return state; }),
  on(AddBookSuccess, (state, { id, title, author }) => [...state, { id, title, author }]),
  on(AddBookFailure, (state, { error }) => { console.error("Error adding book:", error); return state; }),
  on(RemoveBook, (state, { bookId }) => state.filter(book => book.id !== bookId))
);