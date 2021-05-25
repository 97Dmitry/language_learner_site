import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllWordsComponent } from "./all-words.component";

const routes: Routes = [
  {
    path: "",
    component: AllWordsComponent,
    children: [
      {
        path: "all_words",
        component: AllWordsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllWordsRoutingModule {}
