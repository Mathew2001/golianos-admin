import { useDispatch } from "react-redux";
import { updateContactUs } from "../redux/actions/contactUsActions";
import { useForm } from "react-hook-form";

export const useContactUs = () => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm()
  const onSubmit = (id, {name, phone, email, message,copanyName,status}) => {
    dispatch(updateContactUs(id, {name, phone, email, message,copanyName,status}))
    window.location.reload();
  }
  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    reset,
  }
}