import { useState } from "react";
import { Controller } from "react-hook-form";
import imageService from "../redux/sevices/imageServices";
import SingleImageUploader from "./SingleImageUploader";

const ImageUploader = ({ name, control, ImageTitle = "תמונה" }) => {
  const [thisFile, setThisFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange =async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThisFile(file);
    previewFiles(file, field);
  }

  const previewFiles = async (file, field) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const response = await uploadImageToServer(base64Image);
      field.onChange(response);
    };
  };

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    try {
      const response = await imageService.addImage(formData);
      return response; // ✅ return URL
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <SingleImageUploader
          name={name}
          ImageTitle={ImageTitle}
          file={thisFile}
          image={field.value?.image || null}      // ✅ value stored in RHF
          uploaded={!isUploading}
          onChange={(e) => handleFileChange(e, field)}
        />
      )}
    />
  );
};

export default ImageUploader;
