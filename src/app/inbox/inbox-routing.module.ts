import { NgModule } from "@angular/core"
import { type Routes, RouterModule } from "@angular/router"

import { InboxPage } from "./inbox.page"

const routes: Routes = [
  {
    path: "",
    component: InboxPage,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxPageRoutingModule {}
