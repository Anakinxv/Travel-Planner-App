"use client";

import React, { useTransition, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createTrip } from "@/lib/actions/createTrip";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing";

function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const handleFileChange = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);

      // Crear preview URL para mostrar la imagen inmediatamente
      const preview = URL.createObjectURL(fileList[0]);
      setPreviewUrl(preview);

      console.log(fileList[0]);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>New Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={async (formData: FormData) => {
              let uploadedUrl = imageUrl;

              // Si hay archivo, subirlo antes de crear el trip
              if (file) {
                const uploaded = await startUpload([file]);
                if (uploaded && uploaded[0]?.url) {
                  uploadedUrl = uploaded[0].url;
                  setImageUrl(uploadedUrl);
                  formData.append("imageUrl", uploadedUrl);
                }
              }

              startTransition(() => {
                console.log(formData);

                createTrip(formData);
              });
            }}
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Japan trip..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Trip description..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Trip Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Image (optional)
              </label>

              {/* Preview de la imagen */}
              {(previewUrl || imageUrl) && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={previewUrl || imageUrl || ""}
                    alt="Trip Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}

              {/* Botón estético para subir imagen */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e.target.files);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md cursor-pointer transition-colors duration-200"
                >
                  {file ? "Cambiar imagen" : "Seleccionar imagen"}
                </label>
              </div>

              {/* Mostrar nombre del archivo si hay uno seleccionado */}
              {file && (
                <p className="text-sm text-gray-600 mt-2">
                  Archivo seleccionado: {file.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending || isUploading}
              className="w-full"
            >
              {isPending || isUploading ? "Creating..." : "Create Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewTrip;
