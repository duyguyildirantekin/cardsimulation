import React from 'react';
import classes from './CardTypes.css';
import CardType from './CardType/CardType';

const CardTypes = ( props ) => {
   
    let cardTypes = Object.keys( props.cardTypes )
        .map( ctKey => {
            return [...Array( props.cardTypes[ctKey] )].map( ( _, i ) => {
                var cardType=props.cardTypes[ctKey];              
                return <CardType key={cardType.val} id={cardType.val} name={cardType.text} onClicked={props.onSelected} isSelected={cardType.selected} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    return (
        <div className={classes.CardTypes}>         
            {cardTypes}
        </div>
    );
};

export default CardTypes;