import { Component } from "@angular/core"
import { BrazeService } from "../services/braze.service"
import { ToastController } from "@ionic/angular"

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export default class HomePage {
  constructor(
    private brazeService: BrazeService,
    private toastController: ToastController,
  ) {}

  async sendInboxTestEvent(): Promise<void> {
    try {
      this.brazeService.logCustomEvent("INBOX_MESSAGE_TEST", {
        source: "homepage",
        timestamp: new Date().toISOString(),
        user_action: "test_inbox_message",
      })

      const toast = await this.toastController.create({
        message: "Inbox test event sent! You should receive a push notification shortly.",
        duration: 3000,
        position: "bottom",
        color: "success",
      })

      await toast.present()

      console.log("INBOX_MESSAGE_TEST event sent successfully")
    } catch (error) {
      console.error("Failed to send inbox test event:", error)

      const errorToast = await this.toastController.create({
        message: "Failed to send test event. Please try again.",
        duration: 3000,
        position: "bottom",
        color: "danger",
      })

      await errorToast.present()
    }
  }
}
