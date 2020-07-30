import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SingleBookComponent } from "./single-book/single-book.component";
import { SingleAuthorComponent } from "./single-author/single-author.component";
import { AuthGuard } from "./guards/auth.guard";


const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'home' },
    { path: "home", component: HomeComponent, data: {animation: 'Home'} },
    { path: "login", component: LoginComponent, data: {animation: 'Login'} },
    { path: "register", component: RegisterComponent, data: {animation: 'Register'} },
    { path: "dashboard", component: DashboardComponent, data: {animation: 'Dashboard'}, canActivate: [AuthGuard] },
    { path: "dashboard/:id", component: DashboardComponent, data: {animation: 'Dashboard'}, canActivate: [AuthGuard] },
    { path: "books", component: BooksComponent, data: {animation: 'Books'} },
    { path: "authors", component: AuthorsComponent, data: {animation: 'Authors'} },
    { path: "singleBook/:id", component: SingleBookComponent, data: {animation: 'SingleBook'} },
    { path: "singleAuthor", component: SingleAuthorComponent, data: {animation: 'Authors'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
