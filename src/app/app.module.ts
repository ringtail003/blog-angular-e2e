import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { LoginComponent } from "src/app/components/login/login.component";
import { ProfileComponent } from "src/app/components/profile/profile.component";
import { MockWebApi } from "src/app/mocks/mock-web-api";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    environment.e2e ? HttpClientInMemoryWebApiModule.forRoot(MockWebApi) : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
