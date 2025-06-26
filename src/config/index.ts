export const envConfig = {
  jwt_secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  bcrypt_salt: process.env.NEXT_PUBLIC_BCRYPT_SALT_ROUNDS,
  db_url: process.env.NEXT_PUBLIC_DATABASE_URL,
  next_public_url: process.env.NEXT_PUBLIC_NEXT_PUBLIC_URL,
  cloudinary_cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  cloudinary_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
};
