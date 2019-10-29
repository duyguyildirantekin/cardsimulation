import React from 'react';
import classes from './CardType.css';


const CardType = ( props ) => {
   
    return (
        <div  className={props.isSelected?classes.CardTypeSelected : classes.CardType} onClick={()=>props.onClicked(props.id)} >{props.name}</div>     
    );
};

export default CardType;


