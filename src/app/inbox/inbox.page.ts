import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { AlertController } from "@ionic/angular"
import { Subscription } from "rxjs"
import { InboxService } from "../services/inbox.service"
import { InboxCard } from "../models/content-card.interface"

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.page.html",
  styleUrls: ["./inbox.page.scss"],
})
export class InboxPage implements OnInit, OnDestroy {
  inboxCards: InboxCard[] = []
  private subscription: Subscription = new Subscription()

  constructor(
    private inboxService: InboxService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    // Subscribe to inbox cards
    this.subscription.add(
      this.inboxService.inboxCards$.subscribe((cards) => {
        this.inboxCards = cards
      }),
    )

    // Load initial cards
    this.inboxService.loadInboxCards()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async onRefresh(event: any) {
    try {
      await this.inboxService.refreshInboxCards()
    } finally {
      event.target.complete()
    }
  }

  onCardClick(card: InboxCard) {
    this.inboxService.handleCardClick(card)
  }

  async onDeleteCard(card: InboxCard, event: Event) {
    event.stopPropagation() // Prevent card click

    const alert = await this.alertController.create({
      header: "Delete Message",
      message: "Are you sure you would like to delete this message?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "alert-button-cancel",
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            this.inboxService.dismissCard(card.id)
          },
        },
      ],
      cssClass: "delete-alert",
    })

    await alert.present()
  }

  trackByCardId(index: number, card: InboxCard): string {
    return card.id
  }
}

export default InboxPage
