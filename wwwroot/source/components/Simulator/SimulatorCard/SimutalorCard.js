import React from 'react';
import classes from './SimulatorCard.css';
import Input from '../../UI/Input/Input';
import * as  appConstants from '../../../utility/Constants';


const SimulatorCard = (props) => {
   
    let isCico = props.routeId< appConstants.LIMIT_OF_CHECK_OUT ?false:true;
    let checkOutDurak =null;
    if(isCico)
    {
        checkOutDurak=( <Input
                // key={props.cardId}
                elementType={"select"}              
                elementConfig={{ options: props.stations }}
                value={props.stationId}
                label={"İniş Durağı"}
                changed={(e) => props.onStationChanged(props.cardId, e.target.value,true)}></Input>);
    }
    console.log(props);
    return (
       
        <div className={classes.SimulatorCard}>
            <div className={classes.close} onClick={(e)=>props.onRemoveCardCliked(props.index)}></div>
            <Input
                // key={props.cardId}
                elementType={"datepicker"}
                elementConfig={{ showTimeSelect: true, dateFormat: "dd.MM.yyyy hh:mm" }}                
                value={props.boardingTime}
                label={"Biniş Tarihi"}
                changed={(e) => props.onBoardingTimeChanged(props.cardId,e)}
            />
            <Input
                // key={props.cardId}
                elementType={"select"}               
                elementConfig={{ options: props.transportaions }}
                value={props.transportationId}
                label={"Ulaşım Aracı"}
                changed={(e) => props.onTransportaionChanged(props.cardId, e.target.value)}></Input>
             <Input
                // key={props.cardId}
                elementType={"select"}                
                elementConfig={{ options: props.routes }}
                value={props.routeId}
                label={"Hatlar"}
                changed={(e) => props.onRouteChanged(props.cardId, e.target.value)}></Input>
             <Input
                // key={props.cardId}
                elementType={"select"}              
                elementConfig={{ options: props.stations }}
                value={props.stationId}
                label={"Biniş Durağı"}
                changed={(e) => props.onStationChanged(props.cardId, e.target.value,true)}></Input>
            {checkOutDurak}

         <div className={props.isSuccess?classes.Success:classes.Failed}>{props.explanation}</div>
        </div>
    );
};

export default SimulatorCard;