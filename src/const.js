import Resizer from "react-image-file-resizer";

export const UPLOAD_IMG_HEIGHT = 300;
export const MAX_UPLOAD_IMG_SIZE = 5000000;
export const MAX_IMAGE_FILES = 5;

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      300,
      300
    );
  });

export const ROUTE_PATHS = {
  LOGIN: "/login",
  DASHBOARD: "dashboard",
  REVIEWS: "reviews",
  CONTACT_US: "contact-us",
  ADD_BUSINESS: "business/add",
  EDIT_BUSINESS: "business/edit/:id",
  NEW_PAGE: "page/add",
  EDIT_PAGE: "page/edit/:id",
}

export const COOKIE_KEYS = {
  USER_INFO: "user_info",
}
