import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from './users/users.component';
import {UsersService} from "./users/users.service";
import {HomeComponent} from './home/home.component';
import {AuthService} from './auth/auth.service';
import {FooterComponent} from './footer/footer.component';
import {HomeService} from "./home/home.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [UsersService, AuthService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
