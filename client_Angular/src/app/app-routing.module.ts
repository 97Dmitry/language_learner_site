import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        loadChildren: () =>
          import("./components/auth//login/login.module").then(
            (m) => m.LoginModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "registration",
        loadChildren: () =>
          import("./components/auth/registration/registration.module").then(
            (m) => m.RegistrationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
