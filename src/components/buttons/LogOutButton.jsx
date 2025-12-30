import { logOutUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
const LogOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <div className="d-flex justify-content-end p-4">
      <Link to="#" onClick={handleLogout} className="btn btn-primary">יציאה</Link>
    </div>
  )
}
export default LogOutButton