import { useDispatch } from "react-redux";
import { updateReview } from "../redux/actions/reviewActions";
import { useForm } from "react-hook-form";



export const useReviewSubmit = () => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = (id, {userName, content, rating, isApproved}) => {
    try {
      dispatch(updateReview(id, {userName, content, rating, isApproved}));
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  return {
  handleSubmit,
  register,
  errors,
  onSubmit,
}

}


export default useReviewSubmit;