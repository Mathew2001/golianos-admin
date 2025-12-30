import { ROUTE_PATHS } from "../const";
import LinkButton from "../components/buttons/LinkButton";
import LogOutButton from "../components/buttons/LogOutButton";



const SidebarRoutes = ({ businessId}) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="h5 mb-4">העסק שלי</h3>
        <ul>
          <li className="mb-2">
            <LinkButton
              text="העסק שלי"
              to={`business/edit/${businessId}`}
              className="btn btn-primary w-100 fw-bold shadow py-2"
            />
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="h5 mb-4">פורטל</h3>
        <ul>
          <li className="mb-2">
            <LinkButton
              text="הדפים שלי"
              to={ROUTE_PATHS.DASHBOARD}
              className="btn btn-outline-primary w-100 fw-bold shadow-sm py-2"
            />
          </li>
          <li className="mb-2">
            <LinkButton
              text="ביקורות"
              to={ROUTE_PATHS.REVIEWS}
              className="btn btn-outline-primary w-100 fw-bold shadow-sm py-2"
            />
          </li>
          <li className="mb-2">
            <LinkButton
              text="הודעות"
              to={ROUTE_PATHS.CONTACT_US}
              className="btn btn-outline-primary w-100 fw-bold shadow-sm py-2"
            />
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <LogOutButton />
      </div>
    </div>
  )
}

export default SidebarRoutes;