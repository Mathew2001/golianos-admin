import React from 'react'

const SectionCard = ({ section }) => {
  return (
    <div>
      <div className="card my-2">
        <div className="card-header">
          <h5 className="card-title">{section.title}</h5>
        </div>
        <div className="card-body">
          <div className="col-12">
            <p>{section.data.text}</p>
          </div>
          {section.data?.image?.image && (
            <div className="col-lg-4 col-md-6 col-12 border rounded-3 p-2">
              <img src={section.data?.image?.image} alt={section.title} className="col-12" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default SectionCard;