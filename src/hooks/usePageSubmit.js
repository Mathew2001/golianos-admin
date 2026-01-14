import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createPage, updatePage } from "../redux/actions/PageActions";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../const";
import { USER_ROLES } from "../const";
const usePageSubmit = (id, businessId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo} = useSelector((state) => state.userReducer);
  const isAdmin = userInfo?.role === USER_ROLES.SUPER_ADMIN;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const onSubmit = ({ slug, sections, pageName}) => {
    if (businessId && slug && sections && pageName) {
      if (id) {
        dispatch(updatePage(id, { businessId, slug, sections, pageName }));
        navigate(`${isAdmin ? "/admin/dashboard" : "/owner/dashboard"}`);
      }
      else {
        if(isAdmin) {
          dispatch(createPage({ businessId, slug, sections, pageName }));
          navigate(`/admin/dashboard`);
        }
        else {
          console.log("you are not admin");
        }
      }
    }
    else {
      console.log("All fields are required.");
    }
  }
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export default usePageSubmit;