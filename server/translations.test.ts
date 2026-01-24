import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";

describe("Translations System", () => {
  const testTranslation = {
    contentKey: "test.translation.key",
    language: "en",
    originalContent: "Bienvenido a Cancagua",
    translatedContent: "Welcome to Cancagua",
  };

  // Limpiar después de las pruebas
  afterAll(async () => {
    const translations = await db.getAllTranslations();
    const testTranslations = translations.filter(t => t.contentKey.startsWith("test."));
    for (const t of testTranslations) {
      await db.deleteTranslation(t.id);
    }
  });

  describe("createOrUpdateTranslation", () => {
    it("should create a new translation", async () => {
      const result = await db.createOrUpdateTranslation(testTranslation);
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.created).toBe(true);
      
      // Verificar que se creó correctamente
      const saved = await db.getTranslation(testTranslation.contentKey, testTranslation.language);
      expect(saved?.contentKey).toBe(testTranslation.contentKey);
      expect(saved?.language).toBe(testTranslation.language);
    });

    it("should update existing translation with same key and language", async () => {
      const updatedContent = "Welcome to Cancagua Spa";
      
      const result = await db.createOrUpdateTranslation({
        ...testTranslation,
        translatedContent: updatedContent,
      });
      
      expect(result.success).toBe(true);
      expect(result.updated).toBe(true);
      
      // Verificar que se actualizó
      const saved = await db.getTranslation(testTranslation.contentKey, testTranslation.language);
      expect(saved?.translatedContent).toBe(updatedContent);
    });
  });

  describe("getTranslation", () => {
    it("should retrieve translation by key and language", async () => {
      const result = await db.getTranslation(testTranslation.contentKey, testTranslation.language);
      
      expect(result).toBeDefined();
      expect(result?.contentKey).toBe(testTranslation.contentKey);
      expect(result?.language).toBe(testTranslation.language);
    });

    it("should return null for non-existent translation", async () => {
      const result = await db.getTranslation("non.existent.key", "en");
      
      expect(result).toBeNull();
    });
  });

  describe("needsRetranslation", () => {
    it("should return false when translation exists and content matches", async () => {
      const result = await db.needsRetranslation(
        testTranslation.contentKey,
        testTranslation.language,
        testTranslation.originalContent
      );
      
      expect(result).toBe(false);
    });

    it("should return true when original content has changed", async () => {
      const result = await db.needsRetranslation(
        testTranslation.contentKey,
        testTranslation.language,
        "Contenido diferente"
      );
      
      expect(result).toBe(true);
    });

    it("should return true for non-existent translation", async () => {
      const result = await db.needsRetranslation(
        "new.content.key",
        "en",
        "Some content"
      );
      
      expect(result).toBe(true);
    });
  });

  describe("getAllTranslations", () => {
    it("should return array of translations", async () => {
      const result = await db.getAllTranslations();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("updateTranslationContent", () => {
    it("should update translation content by id", async () => {
      // Primero obtener la traducción
      const translation = await db.getTranslation(testTranslation.contentKey, testTranslation.language);
      expect(translation).toBeDefined();
      
      const newContent = "Updated Welcome to Cancagua";
      const result = await db.updateTranslationContent(translation!.id, newContent);
      
      expect(result.success).toBe(true);
      
      // Verificar que se actualizó
      const updated = await db.getTranslation(testTranslation.contentKey, testTranslation.language);
      expect(updated?.translatedContent).toBe(newContent);
    });
  });

  describe("deleteTranslation", () => {
    it("should delete translation by id", async () => {
      // Crear una traducción de prueba para eliminar
      await db.createOrUpdateTranslation({
        contentKey: "test.delete.key",
        language: "fr",
        originalContent: "Prueba",
        translatedContent: "Test",
      });
      
      // Obtener el ID de la traducción creada
      const created = await db.getTranslation("test.delete.key", "fr");
      expect(created).toBeDefined();
      
      const result = await db.deleteTranslation(created!.id);
      expect(result.success).toBe(true);
      
      // Verificar que ya no existe
      const check = await db.getTranslation("test.delete.key", "fr");
      expect(check).toBeNull();
    });
  });

  describe("Multiple languages", () => {
    it("should handle translations for multiple languages with same key", async () => {
      const baseKey = "test.multilang.key";
      const originalContent = "Hola mundo";
      
      // Crear traducciones en múltiples idiomas
      await db.createOrUpdateTranslation({
        contentKey: baseKey,
        language: "en",
        originalContent,
        translatedContent: "Hello world",
      });
      
      await db.createOrUpdateTranslation({
        contentKey: baseKey,
        language: "pt",
        originalContent,
        translatedContent: "Olá mundo",
      });
      
      await db.createOrUpdateTranslation({
        contentKey: baseKey,
        language: "de",
        originalContent,
        translatedContent: "Hallo Welt",
      });
      
      // Verificar cada traducción
      const enTranslation = await db.getTranslation(baseKey, "en");
      const ptTranslation = await db.getTranslation(baseKey, "pt");
      const deTranslation = await db.getTranslation(baseKey, "de");
      
      expect(enTranslation?.translatedContent).toBe("Hello world");
      expect(ptTranslation?.translatedContent).toBe("Olá mundo");
      expect(deTranslation?.translatedContent).toBe("Hallo Welt");
      
      // Limpiar
      if (enTranslation) await db.deleteTranslation(enTranslation.id);
      if (ptTranslation) await db.deleteTranslation(ptTranslation.id);
      if (deTranslation) await db.deleteTranslation(deTranslation.id);
    });
  });
});
