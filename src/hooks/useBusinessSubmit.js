import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createBusiness, updateBusiness} from "../redux/actions/businessActions";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../const";
import { USER_ROLES } from "../const";  
const useBusinessSubmit = (id) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.userReducer);
  const isAdmin = userInfo?.role === USER_ROLES.SUPER_ADMIN;
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
  const navigate = useNavigate();

  const onSubmit =({businessName,businessAddress,businessPhone,businessEmail,businessLogo,userId}) => {
    if(id){
      dispatch(updateBusiness(id,{businessName,businessAddress,businessPhone,businessEmail,businessLogo,userId}));
      navigate(`${isAdmin ? "/admin/dashboard" : "/owner/dashboard"}`);
    }else{
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

export default useBusinessSubmit;