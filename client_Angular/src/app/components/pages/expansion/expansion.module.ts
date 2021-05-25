import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExpansionRoutingModule } from "./expansion-routing.module";
import { ExpansionComponent } from "./expansion.component";

@NgModule({
  declarations: [ExpansionComponent],
  imports: [CommonModule, ExpansionRoutingModule],
})
export class ExpansionModule {}
