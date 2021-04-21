import React from "react";
import "./modal.scss";

const errorModal = (props) => (
    <div className="error__modal">
      <p>Muchas Gracias!!!</p>
      <p>
      Su mensaje ha sido enviado exitosamente..{"!!"}</p>
      <div role="button" tabIndex={0} className="modal__btn flex-center" onClick={props.closeModal} onKeyDown={props.closeModal}>
        <p></p>       
        <p>Ok</p>
      </div>
    </div>
  );


export default errorModal;
