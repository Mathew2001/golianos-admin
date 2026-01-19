import { useState } from "react";
import { Controller } from "react-hook-form";
import imageServices from "../redux/services/imageServices";
import SingleImageUploader from "./SingleImageUploader";

const ImageUploader = ({ name, control, ImageTitle = "תמונה", rules = {} }) => {
   const [thisFile, setThisFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange =async (e, field) => {
    const file = e.target.files?.[0];

    if(field.value){
      try {
        console.log(field.value)
        await imageServices.deleteImage(field.value.public_id);
      } catch (error) {
        console.log(error);
      }
    }
    if (!file) return;
    setThisFile(file);
    const response = await uploadImageToServer(file);
    field.onChange(response);
  }

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    try {
      const response = await imageServices.addImage(formData);
      return response; // ✅ return URL
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={null}
      render={({ field, fieldState }) => (
        <SingleImageUploader
          name={name}
          ImageTitle={ImageTitle}
          file={thisFile}
          image={field.value?.image || null}      // ✅ value stored in RHF
          uploaded={!isUploading}
          onChange={(e) => handleFileChange(e, field)}
          errorField={fieldState.error}
        />
      )}
    />
  );
};


export default ImageUploader;
