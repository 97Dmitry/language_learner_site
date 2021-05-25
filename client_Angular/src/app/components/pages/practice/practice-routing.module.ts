import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PracticeComponent } from "./practice.component";

const routes: Routes = [
  {
    path: "",
    component: PracticeComponent,
    children: [
      {
        path: "practice",
        component: PracticeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeRoutingModule {}
