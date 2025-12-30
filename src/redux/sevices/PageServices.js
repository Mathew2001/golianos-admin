import requests from "./httpService";

const pageServices = {
  getPageBySlug(slug) {
    return requests.get(`/page/getbyslug/${slug}`);
  },
  getAllPagesByBusinessId(id) {
    return requests.get(`/page/getallbybusinessid/${id}`);
  },
  getAllPages() {
    return requests.get("/page/getall");
  },
  getPageById(id) {
    return requests.get(`/page/getbyid/${id}`);
  },
  createPage(body) {
    return requests.post("/page/add", body);
  },
  updatePage(id, body) {
    return requests.put(`/page/update/${id}`, body);
  },
  deletePage(id) {
    return requests.delete(`/page/delete/${id}`);
  },
};

export default pageServices;