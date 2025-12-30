

const DropdownButton = ({ text, items }) => {
  console.log("items:", items);
  return (
    <div className="dropdown">
      <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {text}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {items.map((item) => (
          <li key={item.id}><a className="dropdown-item" href={item.href}>{item.text}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownButton