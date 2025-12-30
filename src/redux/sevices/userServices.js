import requests from "./httpService";

const userServices = {
  loginUser(body){
    return requests.post("/user/login", body);
  },
  getUserById(id){
    return requests.get(`/user/byid/${id}`);
  },
  updateUser(id, body){
    return requests.put(`/user/update/${id}`, body);
  },
}

export default userServices;