import { Trans } from "react-i18next";
import "./Modal.css"

const Modal = ({ modalCloseHandler }) => {
  return (

    <div className="modal" onClick={modalCloseHandler}>
      <div className="box" onClick={e => e.stopPropagation()}>
        <div className="close-btn" onClick={modalCloseHandler}>&times;</div>
        <h4 className="modal-text"><Trans>Are you sure you want to delete the weather forecast</Trans>?</h4>
        <div className="buttons">
          <button onClick={() => modalCloseHandler("Yes")}><Trans>Yes</Trans></button>
          <button onClick={() => modalCloseHandler("No")}><Trans>No</Trans></button>
        </div>
      </div>
    </div>
  );
}

export default Modal;