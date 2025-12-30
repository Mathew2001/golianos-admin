import React from 'react'

const Form = ({ subForms = [], renderSubForms, onSubmit, handleSubmit, buttonText, buttonClass = "btn btn-secondary col-lg-4 col-md-6 col-12" }) => {

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subForms.map((subForm, index) => (
            renderSubForms(subForm, index)
          ))}
        </div>
        <div className="d-flex justify-content-center">
        <button
          type="submit"
            className={buttonClass}
        >
          {buttonText}
        </button>
        </div>
      </form>
    </div>

  )
}

export default Form