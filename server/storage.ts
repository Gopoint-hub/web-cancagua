// Storage helpers using Cloudinary for file uploads
// Replaces Manus WebDev storage proxy with Cloudinary

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variables
// CLOUDINARY_URL format: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
// Or use individual variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
function getCloudinaryConfig() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  
  if (cloudinaryUrl) {
    // CLOUDINARY_URL is automatically parsed by the SDK
    return true;
  }
  
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary credentials missing: set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET"
    );
  }
  
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  
  return true;
}

// Initialize Cloudinary on first use
let initialized = false;
function ensureInitialized() {
  if (!initialized) {
    getCloudinaryConfig();
    initialized = true;
  }
}

/**
 * Upload a file to Cloudinary
 * @param relKey - The relative path/key for the file (used as public_id)
 * @param data - The file data as Buffer, Uint8Array, or base64 string
 * @param contentType - The MIME type of the file
 * @returns Object with key and url
 */
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  ensureInitialized();
  
  const key = normalizeKey(relKey);
  const publicId = key.replace(/\.[^/.]+$/, ""); // Remove extension for public_id
  
  // Determine resource type based on content type
  let resourceType: "image" | "video" | "raw" | "auto" = "auto";
  if (contentType.startsWith("image/")) {
    resourceType = "image";
  } else if (contentType.startsWith("video/") || contentType.startsWith("audio/")) {
    resourceType = "video";
  } else {
    resourceType = "raw";
  }
  
  // Convert data to base64 data URI
  let base64Data: string;
  if (typeof data === "string") {
    // Assume it's already base64
    base64Data = data;
  } else {
    base64Data = Buffer.from(data).toString("base64");
  }
  
  const dataUri = `data:${contentType};base64,${base64Data}`;
  
  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
      folder: getFolder(key),
    });
    
    return {
      key,
      url: result.secure_url,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Cloudinary upload failed: ${message}`);
  }
}

/**
 * Get a URL for a file stored in Cloudinary
 * @param relKey - The relative path/key for the file
 * @returns Object with key and url
 */
export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  ensureInitialized();
  
  const key = normalizeKey(relKey);
  const publicId = key.replace(/\.[^/.]+$/, "");
  
  // Generate URL using Cloudinary
  const url = cloudinary.url(publicId, {
    secure: true,
  });
  
  return {
    key,
    url,
  };
}

/**
 * Delete a file from Cloudinary
 * @param relKey - The relative path/key for the file
 */
export async function storageDelete(relKey: string): Promise<void> {
  ensureInitialized();
  
  const key = normalizeKey(relKey);
  const publicId = key.replace(/\.[^/.]+$/, "");
  
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Cloudinary delete failed: ${message}`);
  }
}

/**
 * Upload an image from URL to Cloudinary
 * @param imageUrl - The URL of the image to upload
 * @param relKey - The relative path/key for the file
 * @returns Object with key and url
 */
export async function storageUploadFromUrl(
  imageUrl: string,
  relKey: string
): Promise<{ key: string; url: string }> {
  ensureInitialized();
  
  const key = normalizeKey(relKey);
  const publicId = key.replace(/\.[^/.]+$/, "");
  
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      public_id: publicId,
      resource_type: "auto",
      overwrite: true,
      folder: getFolder(key),
    });
    
    return {
      key,
      url: result.secure_url,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Cloudinary upload from URL failed: ${message}`);
  }
}

// Helper functions
function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

function getFolder(key: string): string | undefined {
  const parts = key.split("/");
  if (parts.length > 1) {
    return parts.slice(0, -1).join("/");
  }
  return undefined;
}
