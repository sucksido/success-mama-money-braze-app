// src/app/services/braze.service.ts

import { Injectable } from '@angular/core';
import * as braze from '@braze/web-sdk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrazeService {
  private contentCards: braze.Card[] = [];

  constructor() {
    // Initialize Braze SDK
    braze.initialize(environment.braze.androidKey, {
      baseUrl: `https://${environment.braze.endpoint}`,
      enableLogging: true,
      sessionTimeoutInSeconds: 60,
      minimumIntervalBetweenTriggerActionsInSeconds: 30,
    });

    braze.openSession();
  }

  async initialize(): Promise<void> {
    try {
      braze.openSession();
      console.log('Braze SDK session started');
    } catch (err) {
      console.error('Braze initialize() failed', err);
    }
  }

  changeUser(userId: string): void {
    braze.changeUser(userId);
    console.log(`Changed Braze user to: ${userId}`);
  }

  logCustomEvent(eventName: string, properties?: { [key: string]: any }): void {
    braze.logCustomEvent(eventName, properties);
    console.log(`Logged custom event: ${eventName}`, properties);
  }

  async getContentCards(): Promise<braze.Card[]> {
    return new Promise((resolve, reject) => {
      try {
        braze.subscribeToContentCardsUpdates(() => {
          const response = braze.getCachedContentCards();
          this.contentCards = response.cards || [];
          resolve(this.contentCards);
        });
        braze.requestContentCardsRefresh();
      } catch (err) {
        console.error('Failed to get content cards', err);
        reject(err);
      }
    });
  }

  logCardClick(cardId: string): void {
    const card = this.findCardById(cardId);
    if (card) {
      braze.logCardClick(card);
      console.log(`Card click logged for card ID: ${cardId}`);
    } else {
      console.warn(`Card with ID ${cardId} not found`);
    }
  }

  logCardImpression(cardId: string): void {
    const card = this.findCardById(cardId);
    if (card) {
      braze.logCardImpressions([card]);
      console.log(`Card impression logged for card ID: ${cardId}`);
    } else {
      console.warn(`Card with ID ${cardId} not found`);
    }
  }

  dismissContentCard(cardId: string): void {
    // No SDK method for dismiss — implement UI removal if needed
    console.log(`Card with ID ${cardId} dismissed (no-op in SDK)`);
  }

  logCardsDisplayed(): void {
    braze.logContentCardsDisplayed();
    console.log('Content cards display logged');
  }

  private findCardById(cardId: string): braze.Card | undefined {
    return this.contentCards.find((card) => card.id === cardId);
  }

  refreshContentCards(): void {
    braze.requestContentCardsRefresh();
    console.log('Requested content card refresh');
  }
}