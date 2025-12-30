import React from "react";

const SubForm = ({ children = [], title, gridCols = 3 }) => {
  // Map gridCols to Bootstrap column width

  const colSize = Math.floor(12 / gridCols);

  return (
    <div className="col-12 p-4 rounded shadow-sm mb-3" style={{ backgroundColor: '#f0f0f0' }} >
      {title && (
        <h2 className="h5 fw-semibold mb-4 text-dark">{title}</h2>
      )}

      <div className="row g-4">
        {children.map((child, index) => (
          <div key={index} className={`col-12 col-md-${colSize}`}>
            <child.component {...child.props} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubForm;
