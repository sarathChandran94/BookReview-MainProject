import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    authors: any;
    books: any;
    book: any;
  constructor(private homeService: HomeService, private router: Router) { }

    ngOnInit(): void {
        this.homeService.getBooks().subscribe(
            res => this.books = res,
            err => console.log(err)
        );
        this.homeService.getAuthors().subscribe(
            res => this.authors = res,
            err => console.log(err)
        );
        // this.book = this.router.getCurrentNavigation().extras.state;

    }

    getOneBook(id) {
        console.log(id)
        this.homeService.getSingleBook(id).subscribe(
            (res) => {
                this.router.navigateByUrl('/singleBook', {state: res})
            },
            err => console.log(err)
            )
    };

}
