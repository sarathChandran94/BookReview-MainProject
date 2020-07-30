import { Component, OnInit } from '@angular/core';
import { HomeService } from "../services/home.service";
import { Router, ActivatedRoute } from "@angular/router";
import { BookModel } from "../book.model";
import { expandCollapse } from "../animations/expand-collapse.animation";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [expandCollapse]
})
export class DashboardComponent implements OnInit {

    book = new BookModel(null, null, null, null, null, null, null, null);
    neweditedBook = new BookModel(null, null, null, null, null, null, null, null);
    books: any = [];
    id: any;
    myId: any;
    uname: any;
    reviews: any = [];
    // title: any;
    comment: string;
    rating: number;
    newReview = {
        comment: this.comment,
        rating: this.rating
    }
    editClicked = [];
    editBookClicked = [];
    err: any;
    hideEdit = false;
    hideEditAdmin = false;
    constructor(private homeService: HomeService, private router: Router, private actRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.getmyReview();
        this.getMyBooks();
        this.id = this.actRoute.snapshot.params['id'];
        this.editBook(this.id);
        // console.log(this.books)
        // this.book = this.router.getCurrentNavigation().extras.state
    }

    getmyReview() {
        this.uname = localStorage.getItem('uname')
        this.homeService.getReviews(this.uname).subscribe(
            (res) => {
                this.reviews = res;
                // console.log(res)
            },
            (err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['login']);
                    }
                }
                console.log(err.error);
            }
        )
    }

    addBook() {
        console.log(this.book)
        this.book.addedBy = localStorage.getItem('uname');
        this.homeService.addBook(this.book).subscribe(
            res => {
                alert(res['msg'])
                this.getMyBooks();
                // console.log(res)
            },
            err => {
                this.err = err['msg'];
                console.log(err)
            }
        );
    }

    // editToggler() {
    //     this.editClicked = !this.editClicked;
    // }

    editReview(id) {
        // this.editClicked = true;
        this.homeService.editReview(id,this.newReview).subscribe(
            res => {
                alert(res['msg'])
                this.getmyReview();
            },
            err => {
                console.log(err);
            }
        )
    }

    deleteReview(id) {
        this.homeService.deleteReview(id).subscribe(
            res => {
                alert(res['msg'])
                this.getmyReview();
            },
            err => {
                console.log(err)
            }
        );
    }

    getMyBooks() {
        this.uname = localStorage.getItem('uname');
        this.homeService.getMyBook(this.uname).subscribe(
            res => {
                this.books = JSON.parse(JSON.stringify(res));
            },
            err => {
                console.log(err);
            }
        )
    }

    editBook(id) {
        this.homeService.editBook(id).subscribe(
            res => {
                console.log('inside editbook res')
                this.neweditedBook = JSON.parse(JSON.stringify(res));
                this.hideEditAdmin = true;
            },
            err => {
                console.log(err);
            }
        )
    }

    editMyBook(id) {
        this.myId = id;
        this.hideEdit = true;
        this.homeService.editBook(id).subscribe(
            res => {
                this.neweditedBook = JSON.parse(JSON.stringify(res));
            },
            err => {
                console.log(err);
            }
        )
    }

    editedBook() {
        this.homeService.editedBook(this.id, this.neweditedBook).subscribe(
            res => {
                alert(res['msg']);
                this.getmyReview();
                this.hideEditAdmin = false;
            },
            err => {
                console.log(err);
            }
        )
    }

    editedMyBook() {
        console.log(this.myId)
        this.homeService.editedBook(this.myId, this.neweditedBook).subscribe(
            res => {
                alert(res['msg']);
                this.getMyBooks();
                this.hideEdit = false;
            },
            err => {
                console.log(err);
            }
        )
    }

    deleteMyBook(id) {
        this.homeService.deleteBook(id).subscribe(
            res => {
                alert(res['msg'])
                this.getMyBooks();
            },
            err => {
                console.log(err)
            }
        )
    }


}
