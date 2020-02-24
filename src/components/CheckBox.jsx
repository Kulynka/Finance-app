import React from 'react';

const CheckBox = props => {
  return (
    <div className="checkbox">
      <input type="checkbox"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        onClick={props.isChange}
        checked={props.checked}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  )
}

export default CheckBox;
