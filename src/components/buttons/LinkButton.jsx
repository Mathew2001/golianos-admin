import {Link} from 'react-router-dom';

const LinkButton = ({ text, to, className = 'btn btn-outline-primary fw-bold shadow-sm py-2', state}) => {

  return (
    <Link to={to} state={state} className={className}>{text}</Link>
  )
}

export default LinkButton