import React from "react";
import './commons.css';
const LabeledInputComponent = ({id, type, text, placeholder, value, action, reference = null, onEnter = (e)=>{}}) => {

    return (
        <div>
            <label className='commons-label' htmlFor={id}>{text}</label>
            <input className='form-input commons-input' type={type} id={id}
                   placeholder={placeholder} value={value}
                   onChange={action}
                   ref={reference}
                   onKeyUp={(e)=> e.key === 'Enter' ? onEnter(e): null}
            />
        </div>
    );
}

export default LabeledInputComponent;