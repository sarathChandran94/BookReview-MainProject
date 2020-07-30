import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from "../services/home.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ReviewModel } from "../review.model";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
    review = new ReviewModel(null,null,null,null,null)
    liveUsername: any;
    book: any;
    bookId: any;
    addReviewDone: boolean = false;
    // _id: any;
    // body: any;
    // rating: any;

    constructor(private homeService: HomeService, private router: Router, private actRoute: ActivatedRoute, public authService: AuthService) {
        // this.book = this.router.getCurrentNavigation().extras.state;
    }

    ngOnInit(): void {
        this.bookId = this.actRoute.snapshot.params['id'];
        this.getSingleBook(this.bookId);
        this.liveUsername = localStorage.getItem('uname')
    }

    getSingleBook(bookId) {
        this.homeService.getSingleBook(bookId).subscribe(
            res => {
                this.book = JSON.parse(JSON.stringify(res));
            },
            err => {
                console.log(err);
            }
        )
    }

    addReview() {
        this.review.book = this.book._id;
        this.review.username = localStorage.getItem('uname');
        this.homeService.addReview(this.bookId, this.review).subscribe(
            res => {
                alert(res["msg"]);
                this.getSingleBook(this.bookId);
                this.addReviewDone = true;
            },
            err => console.log(err)
        );
    }



}
