import httpService from "./httpService";

const businessServices = {
  updateBusiness(id, body){
    return httpService.put(`/business/update/${id}`, body);
  },
  getBusinessById(id){
    return httpService.get(`/business/byid/${id}`);
  },
  getBusinessByUserId(userId){
    return httpService.get(`/business/byuserid/${userId}`);
  },
}

export default businessServices;