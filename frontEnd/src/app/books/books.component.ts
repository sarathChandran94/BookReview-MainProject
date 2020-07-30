import { Component, OnInit, Output } from '@angular/core';
import { HomeService } from "../services/home.service";
import { Router } from "@angular/router";
import { expandCollapse, zoomAnim } from '../animations/expand-collapse.animation';
import { fadeAnimation, slideInAnimation, zoomAnimation } from '../animations/routeAnimation.animation';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [ slideInAnimation, zoomAnim]
})
export class BooksComponent implements OnInit {

    books: any;
    admin: any;
    sortBy: any = 0;
    sorts: any = [
        { name: 'Sort By', value: 0, disabled: true},
        { name: 'Alphabet (Ascending)', value: 1},
        { name: 'Alphabet (Descending)', value: 2},
        { name: 'Rating (Highest to Lowest)', value: 3},
        { name: 'Year (Newer to Older)', value: 4},
        { name: 'Year (Older to Newer)', value: 5}
    ]
    editBookClicked = [];
    constructor(public homeService: HomeService) { }


    ngOnInit(): void {
        this.isAdmin();
        console.log(this.admin)
        this.homeService.getBooks().subscribe(
            res => this.books = res,
            err => console.log(err)
        );
    }

    // getOneBook(id) {
    //     console.log(id)
    //     this.homeService.getSingleBook(id).subscribe(
    //         (res) => {
    //             this.router.navigateByUrl('/singleBook', {state: res})
    //         },
    //         err => console.log(err)
    //         )
    // };

    isAdmin() {
        this.admin = localStorage.getItem('admin');
        if (this.admin == 'true') {
            this.admin = true;
        }
        else {
            this.admin = false;
        }
    }

    deleteBook(id) {
        this.homeService.deleteBook(id).subscribe(
            res => {
                alert(res['msg']);
                console.log(res['msg']);
                this.homeService.getBooks().subscribe(
                    res => this.books = res,
                    err => console.log(err)
                );
            },
            err => {
                console.log(err)
            }
        )
    }

    sort() {
        this.homeService.sortBy(this.sortBy).subscribe(
            res => {
                this.books = res;
            },
            err => {
                console.log(err);
            }
        );
    }

}
