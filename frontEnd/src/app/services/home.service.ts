import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient, private router: Router) { }

    getBooks() {
        return this.http.get('http://localhost:5000/books')
    }

    getSingleBook(id) {
        return this.http.get('http://localhost:5000/books/'+id)
    }

    getAuthors() {
        return this.http.get('http://localhost:5000/authors')
    }

    addReview(id,book) {
        return this.http.put('http://localhost:5000/user/addReview/'+id._id, book)
    }

    addBook(book) {
        console.log(book)
        return this.http.post('http://localhost:5000/user/addBook/', book)
    }

    getReviews(uname) {
        return this.http.get('http://localhost:5000/user/getReview/'+uname)
    }

    editReview(id,review) {
        return this.http.post('http://localhost:5000/user/editReview/'+id, review)
    }

    deleteReview(id) {
        return this.http.delete('http://localhost:5000/user/deleteReview/'+id)
    }

    getMyBook(uname) {
        return this.http.get('http://localhost:5000/user/getMyBooks/'+uname)
    }

    deleteBook(id) {
        return this.http.get('http://localhost:5000/user/deleteBook/'+id)
    }
    editBook(id) {
        return this.http.get('http://localhost:5000/user/editBook/'+id)
    }

    editedBook(id,book) {
        return this.http.post('http://localhost:5000/user/newEditedBook/'+id, book)
    }

    sortBy(sort) {
        return this.http.get('http://localhost:5000/books/sortby/' + sort)
    }

}
