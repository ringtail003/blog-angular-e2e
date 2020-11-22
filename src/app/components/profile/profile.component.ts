import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Profile } from "src/app/models/profile";
import { LoginService } from "src/app/services/login-service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (!this.loginService.loggedIn()) {
      this.router.navigateByUrl("login");
    }

    this.profile = this.loginService.profile;
  }

  logout(): void {
    this.loginService
      .logout()
      .pipe(
        tap({
          complete: () => this.router.navigateByUrl("login"),
        })
      )
      .subscribe();
  }
}
