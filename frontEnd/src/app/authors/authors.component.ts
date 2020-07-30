import { Component, OnInit } from '@angular/core';
import { HomeService } from "../services/home.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

    authors: any;

    constructor(private homeService: HomeService) { }


    ngOnInit(): void {
        this.homeService.getAuthors().subscribe(
            res => this.authors = res,
            err => console.log(err)
        );
    }

}
