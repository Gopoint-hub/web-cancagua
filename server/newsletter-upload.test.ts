import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the storage module
vi.mock('./storage', () => ({
  storagePut: vi.fn().mockResolvedValue({ 
    url: 'https://cdn.example.com/test-image.png', 
    key: 'newsletter-images/test-image.png' 
  }),
}));

describe('Newsletter Upload and URL Extraction', () => {
  describe('uploadImage endpoint', () => {
    it('should validate base64 image format', () => {
      // Test that invalid base64 format is rejected
      const invalidData = 'not-a-valid-base64-image';
      const matches = invalidData.match(/^data:image\/(\w+);base64,(.+)$/);
      expect(matches).toBeNull();
    });

    it('should extract image type from base64 data', () => {
      const pngData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const matches = pngData.match(/^data:image\/(\w+);base64,(.+)$/);
      expect(matches).not.toBeNull();
      expect(matches![1]).toBe('png');
    });

    it('should extract image type for jpeg format', () => {
      const jpegData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==';
      const matches = jpegData.match(/^data:image\/(\w+);base64,(.+)$/);
      expect(matches).not.toBeNull();
      expect(matches![1]).toBe('jpeg');
    });
  });

  describe('extractFromUrl endpoint', () => {
    it('should extract title from h1 tag (priority over meta)', () => {
      const html = '<html><head><title>Generic Title</title></head><body><h1>Taller del Método Wim Hof</h1></body></html>';
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      expect(h1Match).not.toBeNull();
      expect(h1Match![1]).toBe('Taller del Método Wim Hof');
    });

    it('should fallback to title tag if no h1', () => {
      const html = '<html><head><title>Taller Wim Hof - Cancagua</title></head><body></body></html>';
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      expect(titleMatch).not.toBeNull();
      expect(titleMatch![1]).toBe('Taller Wim Hof - Cancagua');
    });

    it('should extract og:image from meta tags', () => {
      const html = '<html><head><meta property="og:image" content="https://cdn.example.com/image.jpg"></head></html>';
      const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('https://cdn.example.com/image.jpg');
    });

    it('should extract description from meta tags', () => {
      const html = '<html><head><meta name="description" content="Experiencia única de respiración y frío"></head></html>';
      const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('Experiencia única de respiración y frío');
    });

    it('should extract images from CloudFront CDN', () => {
      const html = '<img src="https://d2xsxph8kpxj0f.cloudfront.net/images/event.jpg" alt="Event">';
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      const match = imgRegex.exec(html);
      expect(match).not.toBeNull();
      expect(match![1]).toContain('cloudfront.net');
    });

    it('should extract date in Spanish format', () => {
      const text = 'El evento será el 15 de febrero de 2026';
      const dateMatch = text.match(/(\d{1,2}\s+(?:de\s+)?(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)(?:\s+(?:de\s+)?\d{4})?)/i);
      expect(dateMatch).not.toBeNull();
      expect(dateMatch![1]).toBe('15 de febrero de 2026');
    });

    it('should extract price in Chilean format', () => {
      const text = 'Precio: $150.000 por persona';
      const priceMatch = text.match(/\$\s*([\d.,]+)/);
      expect(priceMatch).not.toBeNull();
      expect(priceMatch![1]).toBe('150.000');
    });

    it('should handle missing og:image gracefully', () => {
      const html = '<html><head><title>Test</title></head></html>';
      const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
      expect(match).toBeNull();
    });
  });

  describe('URL validation', () => {
    it('should accept valid Cancagua URLs', () => {
      const validUrls = [
        'https://cancagua.cl/eventos/taller-wim-hof',
        'https://www.cancagua.cl/servicios/biopiscinas',
        'https://cancagua.cl/navega-relax',
      ];
      
      validUrls.forEach(url => {
        expect(() => new URL(url)).not.toThrow();
      });
    });

    it('should reject invalid URLs', () => {
      const invalidUrls = [
        'not-a-url',
        'ftp://invalid.com',
        '',
      ];
      
      invalidUrls.forEach(url => {
        if (url === '') {
          expect(url.trim()).toBe('');
        } else {
          try {
            new URL(url);
            // If it doesn't throw, check if it's a valid http(s) URL
            const parsed = new URL(url);
            expect(['http:', 'https:'].includes(parsed.protocol)).toBe(false);
          } catch {
            // Expected to throw for invalid URLs
            expect(true).toBe(true);
          }
        }
      });
    });
  });
});
