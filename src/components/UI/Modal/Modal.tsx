import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

const modal = (props: any) => {

  const getSizeFromProps = () => {
    return ["small", "large"].indexOf(props.size) >= 0 ? " " + props.size : "";
  }

  return (
    <>
      <Backdrop show={props.show} clicked={props.handleClose} />
      <div
        className={"modal-main" + getSizeFromProps()}
        style={{
          transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%,-150vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        <span className={"btnClose"} onClick={props.handleClose}>&times;</span>
        {props.children}
      </div>
    </>
  );
};
export default modal;