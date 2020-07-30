import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username: string;
    email: string;
    password: string;

    registeredUser = {
        username: this.username,
        email: this.email,
        password: this.password
    };

    err: any;
    submitted = false;

    constructor(private authService: AuthService, private router: Router) { }


    ngOnInit(): void {
    }

    registerUser() {
        this.authService.registerUser(this.registeredUser).subscribe(
            res => {
                this.router.navigate(['/login']);
                this.submitted = true;
            },
            err => {
                this.err = err.error;
                console.log(err);
            }
        );
    }




}
