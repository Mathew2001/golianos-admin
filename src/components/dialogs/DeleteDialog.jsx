import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";

const DeleteDialog = ({ text, id, action, all = false}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="btn btn-danger" onClick={() => setShowModal(true)}>{all ? "מחק הכל" : "מחק"}</button>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
          dir="rtl"
        >
          <div className="modal-dialog" role="document" dir="rtl" style={{direction: 'rtl'}}>
            <div className="modal-content">
              <div className="modal-header" style={{direction: 'rtl'}}>
                <h5 className="modal-title" style={{width: '100%', textAlign: 'right'}}>אישור מחיקה</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="סגור"
                  onClick={() => setShowModal(false)}
                  style={{marginLeft: 'auto'}}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{direction: 'rtl'}}>
                <p>{text || "האם אתה בטוח שברצונך למחוק את הפריט הזה?"}</p>
              </div>
              <div className="modal-footer" style={{justifyContent: 'flex-start', direction: 'rtl'}}>
                <DeleteButton text="מחק" id={id} action={action} />
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  style={{marginRight: '10px'}}
                >
                  בטל
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteDialog;