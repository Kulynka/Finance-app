import React from 'react';

const Rate = props => {
    return (
        <div 
            className="rateContainer"
            style={{display: props.display ? "" : "none"}}
        >
            <div>{props.todayDate}</div>
            <div>{props.todayRate}</div>
            <div>{props.amount}</div>
        </div>
    )
}

export default Rate;