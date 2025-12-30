import { useFieldArray, Controller } from "react-hook-form";
import InputArea from "./InputArea";
import TextArea from "./TextArea";
import ImageUploader from "./ImageUploader";
function SectionsEditor({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });
  
  return (
    <div className="col-12">
      <div className="d-flex align-items-center justify-content-between mb-3">
        {/* <h3 className="h5 fw-bold mb-0">Sections</h3> */}
        {/* <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            append({ title: "", order: fields.length + 1, data: { text: "" }, images: "" })
          }
        >
          + Add Section
        </button> */}
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <span>{`פסקה ${index + 1}`}</span>
              {/* <button className="btn btn-danger" onClick={() => remove(index)}>מחק</button> */}
            </div>
            <div className="card-body">
              <div className="row g-3 d-flex justify-content-between align-items-center flex-wrap">
                <div className="row">
                <div className="col-lg-4 col-12">
                  <InputArea
                    register={register}
                    name={`sections.${index}.title`}
                    label="כותרת"
                    errors={errors}
                  />
                </div>
                {/* <div className="col-lg-4 col-12">
                  <InputArea
                    register={register}
                    name={`sections.${index}.order`}
                    label="סדר"
                    errors={errors}
                  />
                </div> */}
                <div className="col-lg-4 col-12">
                  <TextArea
                    register={register}
                    name={`sections.${index}.data.text`}
                    label="טקסט"
                    errors={errors}
                  />
                </div>
                </div>
                {
                  field.data.image !== null && (
                    <div className="col-12 ">
                      <ImageUploader name={`sections.${index}.data.image`} control={control} />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SectionsEditor;