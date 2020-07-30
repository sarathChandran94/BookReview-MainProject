import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    user = {
        email: this.email,
        password: this.password
    }
    err: any;

    constructor(public authService: AuthService, private router: Router) { }



    ngOnInit(): void {

    }

    loginUser() {
        this.authService.loginUser(this.user)
            .subscribe(
                response => {
                    localStorage.setItem('token', response["token"])
                    localStorage.setItem('uname', response["user"]["username"])
                    localStorage.setItem('admin', response["user"]["admin"])
                    this.router.navigate(['/dashboard']);
                },
                err => {
                    this.err = err.error;
                    console.log(err.error);
                }
            );
    }

}
