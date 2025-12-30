import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  dataURLtoFile,
  MAX_UPLOAD_IMG_SIZE,
  resizeFile,
  UPLOAD_IMG_HEIGHT,
} from "../const";

const MultiImageUploader = ({ setImages, images }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const upload_Preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const checkImageSize = (file) => {
    if (file.width !== UPLOAD_IMG_HEIGHT || file.height !== UPLOAD_IMG_HEIGHT) {
      return {
        code: "Image size is not correct",
        message: `גודל התמונה חייב להיות ${UPLOAD_IMG_HEIGHT} x ${UPLOAD_IMG_HEIGHT}`,
      };
    }
    return null;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: true,
    maxSize: MAX_UPLOAD_IMG_SIZE,
    getFilesFromEvent: async (event) => {
      const files = event.target.files || event.dataTransfer.files;
      const promises = [];
      for (const file of files) {
        const image = await resizeFile(file);
        promises.push(
          new Promise((resolve) => {
            resolve(Object.assign(file, {
              width: UPLOAD_IMG_HEIGHT,
              height: UPLOAD_IMG_HEIGHT,
              data: image
            }));
          })
        );
      }
      return Promise.all(promises);
    },
    onDrop: (acceptedFiles, fileRejections) => {
      fileRejections.forEach(({ errors }) => {
        if (errors.length > 0) {
          console.log(errors[0].message);
        }
      });
      
      setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => 
        Object.assign(file, {
          preview: file.data
        })
      )]);
    },
    validator: checkImageSize,
  });

  useEffect(() => {
    if (!files.length) return;

    setLoading(true);
    const uploadImages = async () => {
      const dataImageUrls = [];
      
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", dataURLtoFile(file.data, file.name));
        formData.append("upload_preset", upload_Preset);
        
        try {
          const res = await axios.post(uploadUrl, formData);
          dataImageUrls.push(res.data.secure_url);
        } catch (err) {
          console.error("Upload error:", err);
        }
      }

      setImages(prevImages => [...prevImages, ...dataImageUrls]);
      setFiles([]);
      setLoading(false);
    };

    uploadImages();
  }, [files, uploadUrl, upload_Preset, setImages]);

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="w-100 text-end">
      <label className="form-label text-secondary fs-6 fw-semibold mb-2">
        תמונות מוצר
      </label>

      <div className="position-relative">
        <div
          {...getRootProps()}
          className={`form-control d-flex flex-column align-items-center justify-content-center p-4 mb-0 border border-2 border-dashed rounded-3 ${
            isDragActive ? "border-success bg-light" : "border-warning bg-white"
          }`}
          style={{
            cursor: "pointer",
            minHeight: "170px",
            transition: "border-color 0.3s, background-color 0.3s",
            borderColor: isDragActive ? "#198754" : "#FFD600"
          }}
        >
          <input {...getInputProps()} className="d-none" />

          <div className="mb-3">
            <PhotoIcon
              className={`mx-auto d-block mb-2`}
              style={{
                color: isDragActive ? "#198754" : "#0d6efd",
                height: "3rem",
                width: "3rem",
                transition: "color 0.3s"
              }}
              aria-hidden="true"
            />
          </div>

          {isDragActive ? (
            <p className="fs-5 fw-bold text-success m-0">שחרר את התמונות כאן</p>
          ) : (
            <>
              <button
                type="button"
                tabIndex={-1}
                className="btn btn-warning text-white fw-semibold px-4 mb-2"
                style={{ border: "none" }}
                onClick={e => {
                  // allow keyboard navigation
                  e.preventDefault();
                  document.querySelector('input[type="file"]').click();
                }}
              >
                בחר תמונות
              </button>
              <p className="text-muted fs-6 mb-1">או גרור ושחרר תמונות לכאן</p>
            </>
          )}
          <p className="text-muted small mt-2 mb-0">PNG, JPG, GIF עד 10MB</p>
        </div>

        {loading && (
          <div className="mt-3">
            <div className="progress" style={{ height: "0.625rem" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                role="progressbar"
                style={{ width: "50%" }}
              />
            </div>
            <p className="mt-2 text-muted fs-6 text-center">מעלה תמונות...</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="mt-4 row row-cols-2 row-cols-md-3 g-3">
            {images.map((image, index) => (
              <div key={index} className="col">
                <div className="card shadow-sm position-relative h-100">
                  <img
                    src={image}
                    alt={`תמונה ${index + 1}`}
                    className="card-img-top rounded-top"
                    style={{
                      height: "10rem",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="btn btn-danger btn-sm rounded-circle position-absolute"
                    style={{
                      top: "0.5rem",
                      left: "0.5rem",
                      zIndex: 10,
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                    aria-label="הסר תמונה"
                  >
                    <XMarkIcon style={{ height: "1rem", width: "1rem" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageUploader;
