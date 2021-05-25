import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AllWordsRoutingModule } from "./all-words-routing.module";
import { AllWordsComponent } from "./all-words.component";

@NgModule({
  declarations: [AllWordsComponent],
  imports: [CommonModule, AllWordsRoutingModule],
})
export class AllWordsModule {}
