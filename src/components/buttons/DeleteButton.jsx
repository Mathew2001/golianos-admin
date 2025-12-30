import { useDispatch } from 'react-redux'


const DeleteButton = ({ text, id,action, className = 'btn btn-danger'}) => {
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(action(id))} className={className}>{text}</button>
  )
}

export default DeleteButton
