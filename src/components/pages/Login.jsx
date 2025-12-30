
import Form from "../../inputs/forms/Form";
import SubForm from "../../inputs/forms/SubForm";
import InputArea from "../../inputs/InputArea";
import useUserSubmit from "../../hooks/userUserSubmit";
const Login = () => {

  const { register, handleSubmit, errors, onSubmit } = useUserSubmit();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div>
        <Form subForms={[
          {
            title: 'Login',
            gridCols: 1,
            children: [
              {
                component: InputArea,
                props: {
                  register: register,
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Email",
                }
              },
              {
                component: InputArea,
                props: {
                  register: register,
                  name: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "Password",
                }
              }
            ]
          }
        ]}
          renderSubForms={(subForm, index) => (
            <SubForm key={index} title={subForm.title} children={subForm.children} gridCols={subForm.gridCols} />
          )}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          buttonText="Sign in to Admin Portal"
          buttonClass="btn-gray-light col-12"
        />
      </div>
    </div>
  )
}

export default Login;
