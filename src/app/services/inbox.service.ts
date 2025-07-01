import { Injectable } from "@angular/core";
import { BehaviorSubject, type Observable } from "rxjs";
import { BrazeService } from "./braze.service";
import { InboxCard } from "../models/content-card.interface";

@Injectable({
  providedIn: "root",
})
export class InboxService {
  private inboxCardsSubject = new BehaviorSubject<InboxCard[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);

  public inboxCards$: Observable<InboxCard[]> = this.inboxCardsSubject.asObservable();
  public unreadCount$: Observable<number> = this.unreadCountSubject.asObservable();

  constructor(private brazeService: BrazeService) {
    this.loadInboxCards();
  }

  async loadInboxCards(): Promise<void> {
    try {
      const contentCards = await this.brazeService.getContentCards();
      const inboxCards = this.filterInboxCards(contentCards);

      this.inboxCardsSubject.next(inboxCards);
      this.updateUnreadCount(inboxCards);
    } catch (error) {
      console.error("Failed to load inbox cards:", error);
    }
  }

  async refreshInboxCards(): Promise<void> {
    try {
      await this.brazeService.refreshContentCards();
      await this.loadInboxCards();
    } catch (error) {
      console.error("Failed to refresh inbox cards:", error);
    }
  }

  private filterInboxCards(contentCards: any[]): InboxCard[] {
    return contentCards
      .filter((card) => card.type === "inbox" || card.extras?.type === "inbox")
      .map((card) => this.mapToInboxCard(card))
      .sort((a, b) => b.created.getTime() - a.created.getTime());
  }

  private mapToInboxCard(card: any): InboxCard {
    const createdDate = new Date(card.created * 1000); // assuming created is UNIX seconds

    return {
      id: card.id,
      title: card.title || "Notification",
      description: card.description || "",
      imageUrl: card.imageUrl,
      url: card.url,
      type: card.type || "inbox",
      created: createdDate,
      viewed: card.viewed || false,
      dismissed: card.dismissed || false,
      timestamp: this.formatTimestamp(createdDate),
      icon: this.getIconForCard(card),
      extras: card.extras,
    };
  }

  private formatTimestamp(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return (
        date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  }

  private getIconForCard(card: any): string {
    if (card.title?.toLowerCase().includes("transaction")) {
      return "checkmark-circle";
    } else if (card.title?.toLowerCase().includes("banking")) {
      return "card";
    }
    return "notifications";
  }

  private updateUnreadCount(cards: InboxCard[]): void {
    const unreadCount = cards.filter((card) => !card.viewed && !card.dismissed).length;
    this.unreadCountSubject.next(unreadCount);
  }

  markCardAsViewed(cardId: string): void {
    const cards = this.inboxCardsSubject.value;
    const cardIndex = cards.findIndex((card) => card.id === cardId);

    if (cardIndex !== -1 && !cards[cardIndex].viewed) {
      cards[cardIndex].viewed = true;
      this.inboxCardsSubject.next([...cards]);
      this.updateUnreadCount(cards);

      // Log impression to Braze
      this.brazeService.logCardImpression(cardId);
    }
  }

  async dismissCard(cardId: string): Promise<void> {
    try {
      const cards = this.inboxCardsSubject.value;
      const updatedCards = cards.filter((card) => card.id !== cardId);

      this.inboxCardsSubject.next(updatedCards);
      this.updateUnreadCount(updatedCards);

      // Dismiss card in Braze
      this.brazeService.dismissContentCard(cardId);
    } catch (error) {
      console.error("Failed to dismiss card:", error);
    }
  }

  handleCardClick(card: InboxCard): void {
    // Mark as viewed
    this.markCardAsViewed(card.id);

    // Log click to Braze (corrected method name)
    this.brazeService.logCardClick(card.id);

    // Handle deep linking if URL is present
    if (card.url) {
      console.log("Navigating to:", card.url);
      // Implement your navigation logic here
    }
  }
}