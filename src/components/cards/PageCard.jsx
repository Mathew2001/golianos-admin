import SectionCard from './SectionCard';
import LinkButton from '../buttons/LinkButton';
import { deletePage } from '../../redux/actions/PageActions';
import DeleteDialog from '../dialogs/DeleteDialog';
const PageCard = ({page}) => {
  return (
    <div id={page._id}>
      <div className="card my-5">
        <div className="card-header d-flex flex-row justify-content-between">
          <h5 className="card-title">{page.pageName}</h5>
          <div className="d-flex flex-row justify-content-end gap-2">
            {/* <DeleteDialog text="האם אתה בטוח שברצונך למחוק את הדף זה?" id={page._id} action={deletePage} /> */}
            <LinkButton text="עריכה" to={`/page/edit/${page._id}`} className="btn btn-warning" />
          </div>
        </div>
        <div className="card-body">
          {page.sections.map((section) => (
            <SectionCard key={section._id} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PageCard;