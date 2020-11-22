import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Rx from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { LoginService } from "src/app/services/login-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username: string | null = null;
  password: string | null = null;
  loginFailed = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.username || !this.password) {
      return;
    }

    this.loginService
      .login({
        username: this.username,
        password: this.password,
      })
      .pipe(
        tap({
          complete: () => this.router.navigateByUrl("profile"),
        }),
        catchError(() => ((this.loginFailed = true), Rx.EMPTY))
      )
      .subscribe();
  }
}
