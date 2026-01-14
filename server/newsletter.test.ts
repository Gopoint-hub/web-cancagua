import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Newsletter System', () => {
  describe('Database Functions', () => {
    it('should have newsletter CRUD functions', () => {
      expect(db.getAllNewsletters).toBeDefined();
      expect(db.getNewsletterById).toBeDefined();
      expect(db.createNewsletter).toBeDefined();
      expect(db.updateNewsletter).toBeDefined();
      expect(db.deleteNewsletter).toBeDefined();
    });

    it('should have subscriber CRUD functions', () => {
      expect(db.getAllSubscribers).toBeDefined();
      expect(db.getSubscriberById).toBeDefined();
      expect(db.createSubscriber).toBeDefined();
      expect(db.updateSubscriber).toBeDefined();
      expect(db.deleteSubscriber).toBeDefined();
    });

    it('should have list CRUD functions', () => {
      expect(db.getAllLists).toBeDefined();
      expect(db.getListById).toBeDefined();
      expect(db.createList).toBeDefined();
      expect(db.updateList).toBeDefined();
      expect(db.deleteList).toBeDefined();
    });

    it('should have bulk action functions', () => {
      expect(db.bulkDeleteNewsletters).toBeDefined();
      expect(db.bulkDeleteSubscribers).toBeDefined();
      expect(db.bulkUpdateSubscribersStatus).toBeDefined();
    });

    it('should have list-subscriber relationship functions', () => {
      expect(db.addSubscriberToList).toBeDefined();
      expect(db.removeSubscriberFromList).toBeDefined();
      expect(db.getSubscribersInList).toBeDefined();
      expect(db.bulkAddSubscribersToList).toBeDefined();
    });

    it('should have newsletter send tracking functions', () => {
      expect(db.createNewsletterSend).toBeDefined();
      expect(db.updateNewsletterSendStatus).toBeDefined();
    });
  });

  describe('Newsletter Operations', () => {
    it('should get all newsletters without error', async () => {
      const newsletters = await db.getAllNewsletters();
      expect(Array.isArray(newsletters)).toBe(true);
    });

    it('should get all subscribers without error', async () => {
      const subscribers = await db.getAllSubscribers();
      expect(Array.isArray(subscribers)).toBe(true);
    });

    it('should get all lists without error', async () => {
      const lists = await db.getAllLists();
      expect(Array.isArray(lists)).toBe(true);
    });
  });

  describe('Subscriber Functions', () => {
    it('should find subscriber by email', async () => {
      // This should not throw even if subscriber doesn't exist
      const subscriber = await db.getSubscriberByEmail('test@example.com');
      // Can be null or a subscriber object
      expect(subscriber === null || typeof subscriber === 'object').toBe(true);
    });
  });
});
