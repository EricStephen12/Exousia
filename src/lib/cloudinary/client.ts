import { CldUploadWidgetProps } from 'next-cloudinary';

/**
 * Cloudinary configuration for client-side usage
 * 
 * To use Cloudinary, you need to set the following environment variables:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name
 * - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: A preset for uploading images (create in Cloudinary dashboard)
 * 
 * For server-side usage, you also need:
 * - CLOUDINARY_API_KEY: Your Cloudinary API key
 * - CLOUDINARY_API_SECRET: Your Cloudinary API secret
 */

// Check if Cloudinary is configured
const isCloudinaryConfigured = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Default upload preset for Cloudinary
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'exousia-products';

// Get Cloudinary configuration for upload widget
export function getCloudinaryConfig(): Pick<CldUploadWidgetProps, 'uploadPreset' | 'options'> {
  if (!isCloudinaryConfigured) {
    console.error(
      'Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.'
    );
  }
  
  return {
    uploadPreset,
    options: {
      sources: ['local', 'url', 'camera'],
      multiple: true,
      maxFiles: 5,
      styles: {
        palette: {
          window: "#000000",
          sourceBg: "#000000",
          windowBorder: "#8e5d24",
          tabIcon: "#FFFFFF",
          inactiveTabIcon: "#8e5d24",
          menuIcons: "#8e5d24",
          link: "#8e5d24",
          action: "#8e5d24",
          inProgress: "#8e5d24",
          complete: "#8e5d24",
          error: "#c43737",
          textDark: "#000000",
          textLight: "#FFFFFF"
        },
        fonts: {
          default: null,
          "'Clash Display', sans-serif": {
            url: "https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600&display=swap",
            active: true
          }
        }
      }
    }
  };
}

// Helper to check if Cloudinary is configured
export function checkCloudinaryConfig(): boolean {
  if (!isCloudinaryConfigured) {
    console.error(
      'Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.'
    );
    return false;
  }
  return true;
} 