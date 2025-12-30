import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createPage, updatePage } from "../redux/actions/PageActions";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../const";

const usePageSubmit = (id, businessId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        navigate(`${ROUTE_PATHS.DASHBOARD}`);
      }
      else {
        dispatch(createPage({ businessId, slug, sections, pageName }));
        navigate(`${ROUTE_PATHS.DASHBOARD}`);
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