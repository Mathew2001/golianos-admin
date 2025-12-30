import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createBusiness, updateBusiness} from "../redux/actions/businessActions";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../const";

const useBusinessSubmit = (id) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({businessName,businessAddress,businessPhone,businessEmail,businessLogo,userId}) => {

    if(id){
      await dispatch(updateBusiness(id,{businessName,businessAddress,businessPhone,businessEmail,businessLogo,userId}));
      navigate(`/dashboard`);
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