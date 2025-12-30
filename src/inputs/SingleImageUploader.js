import React, { useState, useCallback } from "react";

function SingleImageUploader({
  file,
  image,
  onChange,
  uploaded,
  register,
  name,
  ImageTitle,
}) {

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;

      if (files && files.length > 0) {
        const file = files[0];

        const validTypes = ["image/jpeg", "image/png", "image/gif"];

        if (!validTypes.includes(file.type)) {
          setError(
            "סוג הקובץ אינו נתמך. אנא העלה קובץ מסוג PNG, JPG, או GIF בלבד."
          );
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          setError("הקובץ גדול מדי. הגודל המקסימלי הוא 10MB.");
          return;
        }

        onChange({ target: { files: [file] } });
      }
    },
    [onChange]
  );

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    console.log("file:", file);
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validTypes.includes(file.type)) {
        setError(
          "סוג הקובץ אינו נתמך. אנא העלה קובץ מסוג PNG, JPG, או GIF בלבד."
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("הקובץ גדול מדי. הגודל המקסימלי הוא 10MB.");
        return;
      }

      setError("");
      onChange(e);
    }
  };

  return (
    <div className="container px-0" dir="rtl">
      <div className="mb-3">
        <label className="form-label fw-bold">{ImageTitle}</label>
        <div className="row g-2">
          {/* Upload Area */}
          <div className="col-lg-4 col-md-6 col-12">
            <div
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`p-4 bg-light border rounded-3 text-center position-relative ${
                isDragging
                  ? "border-success border-3 bg-success bg-opacity-10"
                  : "border-secondary border-2"
              }`}
              style={{
                borderStyle: "dashed",
                transition: "background 0.2s, border 0.2s"
              }}
            >
              <div className="mb-2 d-flex flex-column align-items-center justify-content-center">
                {/* Bootstrap does not have icons by default, so a fallback */}
                <div
                  className="mb-2"
                  style={{
                    width: 44,
                    height: 44,
                    background: "#e9ecef",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    color: "#868e96",
                  }}
                >
                  <i className="bi bi-image"></i>
                </div>
                <div className="fw-normal text-secondary small">
                  גרור ושחרר את התמונה כאן, או
                </div>
                <label className="btn btn-success mt-2 mb-0">
                  בחר קובץ
                  <input
                    type="file"
                    id="fileInput"
                    name={name}
                    onChange={handleFileSelect}
                    accept="image/png,image/jpeg,image/gif"
                    className="d-none"
                  />
                </label>
                <div className="form-text mt-2">
                  PNG, JPG, GIF עד 10MB
                </div>
              </div>
            </div>
          </div>
          {/* Image Preview Area */}
          <div className="col-lg-4 col-md-6 col-12">
              {error ? (
                <div className="h-100 d-flex align-items-center justify-content-center border border-danger rounded-3 bg-danger bg-opacity-10 p-2">
                  <p className="text-danger text-center m-0 small">{error}</p>
                </div>
              ) : file ? (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center border rounded-3 bg-white">
                  {!uploaded ? (
                    <p className="text-secondary small mb-0">מעלה תמונה...</p>
                  ) : (
                    <>
                      <img
                        src={image}
                        alt="תצוגה מקדימה"
                        style={{
                          maxHeight: "9rem",
                          width: "100%",
                          objectFit: "contain",
                          padding: 6,
                        }}
                        className="mb-2"
                      />
                      <p className="small mb-0 text-secondary">תמונה חדשה</p>
                    </>
                  )}
                </div>
              ) : image ? (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center border rounded-3 bg-white">
                  <img
                    src={image}
                    alt="תמונה קיימת"
                    style={{
                      maxHeight: "9rem",
                      width: "100%",
                      objectFit: "contain",
                      padding: 6,
                    }}
                    className="mb-2"
                  />
                  <p className="small mb-0 text-secondary">תמונה קיימת</p>
                </div>
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center border rounded-3 bg-light">
                  <p className="mb-0 text-secondary ">אין תמונה</p>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}

export default SingleImageUploader;