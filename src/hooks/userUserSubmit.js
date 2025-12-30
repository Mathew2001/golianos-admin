import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/userActions";
import { ROUTE_PATHS } from "../const";

const useUserSubmit = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    if(email && password) {
      await dispatch(loginUser(email, password));
      navigate(ROUTE_PATHS.DASHBOARD);
    }
  }
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};

export default useUserSubmit;
