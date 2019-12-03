import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

const modal = (props: any) => {

  return (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.handleClose} />
        <div
          className="modal-main"
          style={{
            transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%,-150vh)',
            opacity: props.show ? '1' : '0'
          }}
        >
          {props.children}
        </div>
    </React.Fragment>
  );
};
export default modal;