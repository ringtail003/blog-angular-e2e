import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as Rx from "rxjs";
import { tap } from "rxjs/operators";
import { Login } from "src/app/models/login";
import { Profile } from "src/app/models/profile";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private _profile: Profile | null = null;

  constructor(private http: HttpClient) {}

  login(params: Login): Rx.Observable<Profile> {
    return this.http.post<Profile>("/api/login", params).pipe(
      tap({
        next: (profile) => (this._profile = profile),
      })
    );
  }

  logout(): Rx.Observable<void> {
    return this.http.post<void>("/api/logout", null).pipe(
      tap({
        complete: () => (this._profile = null),
      })
    );
  }

  loggedIn(): boolean {
    return !!this._profile;
  }

  get profile(): Profile | null {
    return this._profile;
  }
}
