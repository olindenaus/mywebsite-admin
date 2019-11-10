import React from 'react';

import './Modal.scss';

const modal = (props: any) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    
    return (
      <div className={showHideClassName}>
        <section className="modal-main" >
          {props.children}
          <button className="exit-modal" onClick={props.handleClose}>Close</button>
        </section>
      </div>
    );
};
export default modal;