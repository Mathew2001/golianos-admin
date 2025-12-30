import requests from "./httpService";

const imageServices = {
  addImage(body){
    return requests.post("/image/add", body);
  }
}

export default imageServices;