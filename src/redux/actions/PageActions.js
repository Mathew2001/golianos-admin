import pageServices from "../sevices/PageServices";

export const GET_ALL_PAGES_SUCCESS = "GET_ALL_PAGES_SUCCESS";
export const GET_ALL_PAGES_FAIL = "GET_ALL_PAGES_FAIL";
export const GET_PAGE_BY_SLUG_SUCCESS = "GET_PAGE_BY_SLUG_SUCCESS";
export const GET_PAGE_BY_SLUG_FAIL = "GET_PAGE_BY_SLUG_FAIL";
export const GET_PAGE_BY_ID_SUCCESS = "GET_PAGE_BY_ID_SUCCESS";
export const GET_PAGE_BY_ID_FAIL = "GET_PAGE_BY_ID_FAIL";
export const GET_ALL_PAGES_BY_BUSINESS_ID_SUCCESS = "GET_ALL_PAGES_BY_BUSINESS_ID_SUCCESS";
export const GET_ALL_PAGES_BY_BUSINESS_ID_FAIL = "GET_ALL_PAGES_BY_BUSINESS_ID_FAIL";
export const CREATE_PAGE_SUCCESS = "CREATE_PAGE_SUCCESS";
export const CREATE_PAGE_FAIL = "CREATE_PAGE_FAIL";
export const UPDATE_PAGE_SUCCESS = "UPDATE_PAGE_SUCCESS";
export const UPDATE_PAGE_FAIL = "UPDATE_PAGE_FAIL";
export const DELETE_PAGE_SUCCESS = "DELETE_PAGE_SUCCESS";
export const DELETE_PAGE_FAIL = "DELETE_PAGE_FAIL";

export const getAllPages = () => async (dispatch) => {
  try {
    const res = await pageServices.getAllPages();
    if (res) {
      dispatch({ type: GET_ALL_PAGES_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: GET_ALL_PAGES_FAIL, payload: error?.response?.data?.message || "Error getting all pages" });
  }
};

export const getAllPagesByBusinessId = (id) => async (dispatch) => {
  try {
    const res = await pageServices.getAllPagesByBusinessId(id);
    if (res) {
      dispatch({ type: GET_ALL_PAGES_BY_BUSINESS_ID_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: GET_ALL_PAGES_BY_BUSINESS_ID_FAIL, payload: error?.response?.data?.message || "Error getting all pages by business id" });
  }
};

export const getPageBySlug = (slug) => async (dispatch) => {
  try {
    const res = await pageServices.getPageBySlug(slug);
    if (res) {
      dispatch({ type: GET_PAGE_BY_SLUG_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: GET_PAGE_BY_SLUG_FAIL, payload: error?.response?.data?.message || "Error getting page by slug" });
  }
};

export const getPageById = (id) => async (dispatch) => {
  try {
    const res = await pageServices.getPageById(id);
    if (res) {
      dispatch({ type: GET_PAGE_BY_ID_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: GET_PAGE_BY_ID_FAIL, payload: error?.response?.data?.message || "Error getting page by id" });
  }
};

export const createPage = ({businessId, slug, sections,pageName}) => async (dispatch) => {
  try {

    const res = await pageServices.createPage({businessId, slug, sections,pageName});
    if (res) {
      dispatch({ type: CREATE_PAGE_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: CREATE_PAGE_FAIL, payload: error?.response?.data?.message || "Error creating page" });
  }
};

export const updatePage = (id, {businessId, slug, sections,pageName}) => async (dispatch) => {
  try {
        console.log("sections:", sections);
    console.log("pageName:", pageName);
    console.log("businessId:", businessId);
    console.log("slug:", slug);
    const res = await pageServices.updatePage(id, {businessId, slug, sections,pageName});
    if (res) {
      dispatch({ type: UPDATE_PAGE_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: UPDATE_PAGE_FAIL, payload: error?.response?.data?.message || "Error updating page" });
  }
};

export const deletePage = (id) => async (dispatch) => {
  try {
    const res = await pageServices.deletePage(id);
    if (res) {
      dispatch({ type: DELETE_PAGE_SUCCESS, payload: res });
      window.location.reload();
    }
  } catch (error) {
    dispatch({ type: DELETE_PAGE_FAIL, payload: error?.response?.data?.message || "Error deleting page" });
  }
};
