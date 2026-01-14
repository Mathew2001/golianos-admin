import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/userActions";
import { ROUTE_PATHS } from "../const";
import { USER_ROLES } from "../const";

const useUserSubmit = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.userReducer);
  const isAdmin = userInfo?.role === USER_ROLES.SUPER_ADMIN;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    if(email && password) {
      await dispatch(loginUser(email, password));
      navigate(`${isAdmin ? "/admin" : "/owner"}/${isAdmin ? ROUTE_PATHS.ADMIN_DASHBOARD : ROUTE_PATHS.OWNER_DASHBOARD}`);
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
