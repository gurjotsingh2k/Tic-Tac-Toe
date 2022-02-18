import React, { Component } from "react";
import '../styles.css';

const Square = (props) => {
    return (
        <button className="sqaure" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default Square;