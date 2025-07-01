import { Injectable } from "@angular/core"
import { PushNotifications, type PushNotificationSchema, type ActionPerformed } from "@capacitor/push-notifications"
import { BrazeService } from "./braze.service"
import { InboxService } from "./inbox.service"

@Injectable({
  providedIn: "root",
})
export class PushNotificationService {
  constructor(
    private brazeService: BrazeService,
    private inboxService: InboxService,
  ) {}

  async initialize(): Promise<void> {
    try {
      const result = await PushNotifications.requestPermissions()

      if (result.receive === "granted") {
        await PushNotifications.register()

        this.setupListeners()

        console.log("Push notifications initialized successfully")
      } else {
        console.warn("Push notification permission not granted")
      }
    } catch (error) {
      console.error("Failed to initialize push notifications:", error)
    }
  }

  private setupListeners(): void {
    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration success, token: " + token.value)
    })

    PushNotifications.addListener("registrationError", (error) => {
      console.error("Error on registration: " + JSON.stringify(error))
    })

    PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
      this.pushNotificationReceived(notification)
    })

    // Method called when tapping on a notification
    PushNotifications.addListener("pushNotificationActionPerformed", (notification: ActionPerformed) => {
      console.log("Push notification action performed", notification)
      this.handleNotificationAction(notification)
    })
  }

  private async pushNotificationReceived(notification: PushNotificationSchema): Promise<void> {
    console.log("Push notification received:", notification)

    try {
      const extras = notification.data || {}

      if (extras.type === "inbox" || extras.source === "braze") {
        console.log("Inbox notification received, refreshing content cards...")

        await this.brazeService.refreshContentCards()

        await this.inboxService.refreshInboxCards()

        console.log("Content cards refreshed successfully")
      }
    } catch (error) {
      console.error("Error handling push notification:", error)
    }
  }

  private handleNotificationAction(notification: ActionPerformed): void {
    const data = notification.notification.data

    if (data && data.url) {
      console.log("Handling deep link:", data.url)
    }
  }
}
