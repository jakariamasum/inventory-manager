/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utils/cn";
import { envConfig } from "@/config";
import Image from "next/image";

interface InventoryImageUploadProps {
  name: string;
  className?: string;
}

const InventoryImageUpload: React.FC<InventoryImageUploadProps> = ({
  name,
  className,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const imageUrl = watch(name);
  const [preview, setPreview] = React.useState<string | null>(imageUrl || null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", envConfig.cloudinary_preset!);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${envConfig.cloudinary_cloud_name!}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setValue(name, data.secure_url, { shouldValidate: true });
        setPreview(data.secure_url);
      } else {
        console.error("Cloudinary upload failed", data);
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-sm text-muted-foreground hover:border-ring transition-all">
        <label htmlFor={name} className="cursor-pointer text-center w-full">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              className="max-h-48 object-contain mx-auto"
              width={100}
              height={100}
            />
          ) : (
            <div>
              <p>
                {loading ? "Uploading..." : "Click or drag to upload an image"}
              </p>
              <p className="text-xs text-gray-400">(PNG, JPG, JPEG)</p>
            </div>
          )}
        </label>
        <input
          id={name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {errors[name] && (
        <p className="text-sm text-destructive">
          {(errors[name] as any)?.message}
        </p>
      )}
    </div>
  );
};

export default InventoryImageUpload;
