import requests from "./httpService";

const imageServices = {
  addImage(body){
    return requests.post("/image/add", body, {headers: { "Content-Type": "multipart/form-data" },withCredentials: true});
  },  
  deleteImage(public_id){
    return requests.delete(`/image/delete`,{ data: { public_id } });
  }
}

export default imageServices;