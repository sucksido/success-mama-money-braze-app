import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouteReuseStrategy } from "@angular/router"

import { IonicModule, IonicRouteStrategy } from "@ionic/angular"

import { AppComponent } from "./app.component"
import { AppRoutingModule } from "./app-routing.module"
import { BrazeService } from "./services/braze.service"
import { PushNotificationService } from "./services/push-notification.service"
import { InboxService } from "./services/inbox.service"
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicModule.forRoot(), SharedModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BrazeService,
    PushNotificationService,
    InboxService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
