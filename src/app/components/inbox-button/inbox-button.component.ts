import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { Router } from "@angular/router"
import { Subscription } from "rxjs"
import { InboxService } from "../../services/inbox.service"

@Component({
  selector: "app-inbox-button",
  templateUrl: "./inbox-button.component.html",
  styleUrls: ["./inbox-button.component.scss"],
})
export class InboxButtonComponent implements OnInit, OnDestroy {
  unreadCount = 0
  private subscription: Subscription = new Subscription()

  constructor(
    private router: Router,
    private inboxService: InboxService,
  ) {}

  ngOnInit() {
    // Subscribe to unread count changes
    this.subscription.add(
      this.inboxService.unreadCount$.subscribe((count) => {
        this.unreadCount = count
      }),
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  navigateToInbox() {
    this.router.navigate(["/inbox"])
  }
}
