import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, MainLayoutComponent],
  imports: [AppRoutingModule, BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
