'use server';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const deleteImage = async (imageUrl: string) => {
  const publicId = getPublicIdFromUrl(imageUrl);
  console.log(publicId);
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getPublicIdFromUrl = (url: string) => {
  // Hilangkan domain Cloudinary dan folder hingga direktori upload/
  const parts = url.split('/upload/');

  if (parts.length > 1) {
    // Ambil bagian setelah /upload/
    const path = parts[1];

    // Pisahkan dengan '/' dan hilangkan bagian yang mengandung versi (v1715871806)
    const pathParts = path.split('/');
    const publicIdParts = pathParts.slice(1).join('/'); // Ambil bagian setelah 'v1715871806'

    // Hilangkan ekstensi file
    const publicId = publicIdParts.replace(/\.[^/.]+$/, '');

    return publicId;
  }

  throw new Error('URL tidak valid.');
};
