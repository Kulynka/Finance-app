import React from 'react';

const Input = props => {
    return (
        <input 
            id={props.name}
            name={props.name}
            type="text"
            value={props.value}
            onChange={props.handleChange}
            placedolder={props.placeholder}
        />
    )
}

export default Input;