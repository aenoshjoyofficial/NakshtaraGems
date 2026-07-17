"use client";

import * as React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { CloudUpload as UploadIcon } from "@mui/icons-material";

interface MediaUploaderProps {
  label?: string;
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
}

export default function MediaUploader({
  label = "Upload Image",
  onUploadSuccess,
  currentImageUrl,
}: MediaUploaderProps) {
  const [uploading, setUploading] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(currentImageUrl || "");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await uploadFile(files[0]);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setPreviewUrl(data.url);
      onUploadSuccess(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  return (
    <Box>
      <Typography variant="caption" sx={{ display: "block", mb: 1, fontWeight: "bold", color: "#888888", letterSpacing: 1, textTransform: "uppercase" }}>
        {label}
      </Typography>
      
      <Box
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          border: "1px dashed rgba(197, 160, 89, 0.4)",
          bgcolor: "rgba(255, 255, 255, 0.02)",
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: "#C5A059",
            bgcolor: "rgba(197, 160, 89, 0.03)",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
          position: "relative"
        }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {uploading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 1 }}>
            <CircularProgress size={24} sx={{ color: "#C5A059", mb: 1 }} />
            <Typography variant="caption" sx={{ color: "#888888", letterSpacing: 0.5 }}>
              Uploading secure asset...
            </Typography>
          </Box>
        ) : (
          <>
            {previewUrl ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", justifyContent: "center" }}>
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Preview"
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    border: "1px solid rgba(197, 160, 89, 0.3)",
                  }}
                />
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="caption" sx={{ display: "block", color: "#C5A059", fontWeight: "bold" }}>
                    Image Ready
                  </Typography>
                  <Typography variant="caption" sx={{ display: "block", color: "#888888", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {previewUrl}
                  </Typography>
                  <Button size="small" sx={{ color: "#C5A059", fontSize: 9, p: 0, minWidth: 0, mt: 0.5 }}>
                    Change Image
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <UploadIcon sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: 28, mb: 1 }} />
                <Typography variant="caption" sx={{ color: "#cccccc", display: "block", mb: 0.5 }}>
                  Drag & drop image here or click to browse
                </Typography>
                <Typography variant="caption" sx={{ color: "#666666", fontSize: 9 }}>
                  Supports PNG, JPG, WEBP (Max 5MB)
                </Typography>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
