import React from 'react';

const RadioButton = props => {
    return (
        <div className="radiobutton">
            <input 
                type="radio"
                id={props.id}
                value={props.value}
                onChange={props.changed}
                checked={props.checked}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default RadioButton;