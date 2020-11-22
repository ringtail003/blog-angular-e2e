import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "src/app/components/login/login.component";
import { ProfileComponent } from "src/app/components/profile/profile.component";

const routes: Routes = [
  {
    component: LoginComponent,
    path: "login",
  },
  {
    component: ProfileComponent,
    path: "profile",
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
