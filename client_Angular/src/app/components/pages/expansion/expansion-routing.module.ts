import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpansionComponent } from "./expansion.component";

const routes: Routes = [
  {
    path: "",
    component: ExpansionComponent,
    children: [
      {
        path: "expansion",
        component: ExpansionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpansionRoutingModule {}
