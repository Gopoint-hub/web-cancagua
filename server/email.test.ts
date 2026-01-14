import { describe, it, expect, vi } from 'vitest';

describe('Email Configuration', () => {
  it('should have RESEND_API_KEY configured', () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe('');
    expect(apiKey?.startsWith('re_')).toBe(true);
  });

  it('should have FROM_EMAIL configured', () => {
    const fromEmail = process.env.FROM_EMAIL;
    expect(fromEmail).toBeDefined();
    expect(fromEmail).not.toBe('');
    expect(fromEmail).toContain('@');
  });

  it('should be able to import email module', async () => {
    const emailModule = await import('./email');
    expect(emailModule.sendEmail).toBeDefined();
    expect(emailModule.sendBulkEmails).toBeDefined();
    expect(emailModule.sendTestEmail).toBeDefined();
    expect(emailModule.generateNewsletterWrapper).toBeDefined();
    expect(emailModule.htmlToPlainText).toBeDefined();
  });

  it('should generate newsletter wrapper HTML', async () => {
    const { generateNewsletterWrapper } = await import('./email');
    const html = generateNewsletterWrapper('<p>Test content</p>');
    
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Test content');
    expect(html).toContain('Cancagua');
  });

  it('should convert HTML to plain text', async () => {
    const { htmlToPlainText } = await import('./email');
    const html = '<h1>Hello</h1><p>World</p>';
    const text = htmlToPlainText(html);
    
    expect(text).toContain('Hello');
    expect(text).toContain('World');
    expect(text).not.toContain('<');
    expect(text).not.toContain('>');
  });
});
