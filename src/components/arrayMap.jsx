import React from "react";

const ArrayMAp = props => {
    const arr = props.array;
    const listArr = arr.map(( {name, email}, index ) => {
        return <p key={index}>{name} - {email}</p>
    })
    return listArr;
}

export default ArrayMAp;