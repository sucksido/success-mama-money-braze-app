import { Component, type OnInit } from "@angular/core"
import { BrazeService } from "./services/braze.service"
import { PushNotificationService } from "./services/push-notification.service"

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private brazeService: BrazeService,
    private pushNotificationService: PushNotificationService,
  ) {}

  async ngOnInit() {
    await this.brazeService.initialize()
    await this.pushNotificationService.initialize()
  }
}
