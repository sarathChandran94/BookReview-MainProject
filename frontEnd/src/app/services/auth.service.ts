import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return localStorage.getItem('token');
    }

    registerUser(user) {
        return this.http.post('http://localhost:5000/user/register', user)
    }

    loginUser(user) {
        return this.http.post('http://localhost:5000/user/login', user)
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['home']);
    }
}
