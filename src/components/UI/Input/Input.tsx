import React from 'react';

import './Input.scss';

const input = (props: any) => {
    let inputElement = null;
    const inputClasses = ['input-element'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('invalid');
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        default: 
        inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={'validation-error'}>Please enter a valid value!</p>
    }

    return (
        <div className={'input'}>
            <label
                className={'label'}>{props.label}</label>
                {inputElement}
                {validationError}
        </div>
    )
};
export default input;