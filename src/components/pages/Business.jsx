import useBusinessSubmit from "../../hooks/useBusinessSubmit";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "../../inputs/forms/Form";
import SubForm from "../../inputs/forms/SubForm";
import InputArea from "../../inputs/InputArea";
import { useEffect } from "react";
import { getBusinessById } from "../../redux/actions/businessActions";
import { useDispatch } from "react-redux";
import ImageUploader from "../../inputs/ImageUploader";

const Business = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { onSubmit, register, handleSubmit, errors, reset, control } = useBusinessSubmit(id);

  const { business, loading } = useSelector((state) => state.businessReducer);

  useEffect(() => {
    dispatch(getBusinessById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (business) {
      reset({
        businessName: business.businessName,
        businessAddress: business.businessAddress,
        businessPhone: business.businessPhone,
        businessEmail: business.businessEmail,
        businessLogo: business.businessLogo,
      });
    }
  }, [business]);
  if (!business || loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-md-6 col-12">
        <Form subForms={[
          {
            title: "פרטי העסק",
            gridCols: 1,
            children: [
              {
                component: InputArea,
                props: {
                  register: register,
                  name: "businessName",
                  label: "שם העסק",
                  type: "text",
                  placeholder: "שם העסק",
                }
              },
              {
                component: InputArea,
                props: {
                  register: register,
                  name: "businessAddress",
                  label: "כתובת",
                  type: "text",
                  placeholder: "כתובת",
                }
              },
              {
                component: InputArea,
                props: {
                  register: register,
                  name: "businessPhone",
                  label: "טלפון",
                  type: "text",
                  placeholder: "טלפון",
                }
              },
              {
                component: InputArea,
                props: {
                  register: register,
                  name: "businessEmail",
                  label: "דואר אלקטרוני",
                  type: "email",
                  placeholder: "דואר אלקטרוני",
                }
              },
              {
                component: ImageUploader,
                props: {
                  control: control,
                  name: "businessLogo",
                  ImageTitle: "לוגו",
                }
              }
            ]
          }
        ]} renderSubForms={(subForm, index) => (
          <SubForm key={index} title={subForm.title} children={subForm.children} gridCols={subForm.gridCols} />
        )} handleSubmit={handleSubmit} onSubmit={onSubmit} buttonText="עריכת פרטי העסק" buttonClass="btn-gray-light col-12" />
      </div>
    </div>
  )
}

export default Business;