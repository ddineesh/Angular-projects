import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';     

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  newTitle = "";
  newAuthor = ""

  books: Book[] = [];

    ngOnInit(): void {
    let savedBooks = localStorage.getItem("books");
    
    this.books = savedBooks ? JSON.parse(savedBooks) : []
  }

  addBook() {
    if (this.newTitle && this.newAuthor) {
      let newBook: Book = {
        id: Date.now() + 1,
        title: this.newTitle,
        author: this.newAuthor
      };
      this.books.push(newBook);
      this.newTitle = "";
      this.newAuthor = "";
      localStorage.setItem("books", JSON.stringify(this.books));
    }
  }

   deleteBook(id: number) {
    this.books = this.books.filter(book => book.id !== id);
    localStorage.setItem("books", JSON.stringify(this.books));
  }

}
