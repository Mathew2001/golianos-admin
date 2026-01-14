import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePageSubmit from '../../../hooks/usePageSubmit'
import { useParams, useLocation } from 'react-router-dom'
import { getPageById } from '../../../redux/actions/PageActions'
import Form from '../../../inputs/forms/Form'
import SubForm from '../../../inputs/forms/SubForm'
import InputArea from '../../../inputs/InputArea'
import LinkButton from '../../buttons/LinkButton'
import SectionsEditor from '../../../inputs/SectionsEditor'
import { ROUTE_PATHS } from '../../../const'
import ImageUploader from '../../../inputs/ImageUploader'

const NewPage = () => {
  const { id } = useParams();

  const {business} = useSelector((state) => state.businessReducer);
  const businessId = business._id;
  const { onSubmit, register, handleSubmit, errors, reset, control } = usePageSubmit(id, businessId);
  const dispatch = useDispatch();
  
  const { pageById } = useSelector((state) => state.pageReducer);

  useEffect(() => {
    if (id) {
      dispatch(getPageById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (pageById&&id) {
      reset({
        slug: pageById.slug,
        sections: pageById.sections,
        pageName: pageById.pageName,
      });
    }
  }, [pageById, reset]);


  if (!business || !pageById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LinkButton text="חזרה לדף הבית" to={"/owner/dashboard"} className="btn btn-primary" />
      <Form
        subForms={[
          {
            title: 'שם הדף',
            children: [
              {
                component: InputArea,
                props: {
                  register,
                  name: 'pageName',
                  label: '',
                  errors,
                },
              },
            ],
          },
          {
            title: 'פסקאות',
            children: [
              {
                component: SectionsEditor,
                props: {
                  control,
                  register,
                  errors,
                },
              },
            ],
            gridCols: 1,
          },
        ]}
        renderSubForms={(subForm, index) => (
          <SubForm key={index} title={subForm.title} children={subForm.children} gridCols={subForm.gridCols}  />
        )}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        buttonText={id ? 'עריכת דף' : 'הוספת דף'}
      />
    </div>
  )
}

export default NewPage