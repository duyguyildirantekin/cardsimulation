import React, { Component } from 'react';
import Aux from '../../hoc/hAux/hAux';
import axios from '../../axiosInstance';
import SimulatorCard from '../../components/Simulator/SimulatorCard/SimutalorCard';
import CardTypes from '../../components/Simulator/CardTypes/CardTypes';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../components/UI/Button/Button';
import classes from './Simulator.css';
class Simulator extends Component {

    constructor(props) {
        super(props);
        this.onCardTypeChanged = this.onCardTypeChanged.bind(this);
        this.onTransportaionChanged = this.onTransportaionChanged.bind(this);
        this.onBoardingTimeChanged = this.onBoardingTimeChanged.bind(this);
        this.onRouteChanged = this.onRouteChanged.bind(this);
        this.onStationChanged = this.onStationChanged.bind(this);
        this.onRemoveCardCliked = this.onRemoveCardCliked.bind(this);
        this.getStations = this.getStations.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
        this.addNewSimulatorCard = this.addNewSimulatorCard.bind(this);
        this.onRunSimulation = this.onRunSimulation.bind(this);
        this.getFetchSimulationInfo = this.getFetchSimulationInfo.bind(this);

        this.state = {
            loaded: false,
            selectedCardType: 0,
            fare: 0,
            simulatorCardCounter: 0,
            simulatorCards: [],
            transportations: [],
            cardTypes: []
        }
    }

    componentWillMount() {
        this.onInitCardTypes();
        this.onInitTrasportationOption();
        this.addNewSimulatorCard();
    }

    onInitTrasportationOption() {

        axios.get('/Home/GetTransportations')
            .then(response => {
                this.setState({ transportations: response });

            });
    }

    onInitCardTypes() {

        axios.get('/Home/GetCardTypes')
            .then(response => {
             
                const cardTypes = response.map((item, i) => {
                    return { val: item.value, text: item.displayValue, selected: false }
                });
                this.setState({ cardTypes: cardTypes, loaded: true });

            });

    }
    onCardTypeChanged(id) {

        let tempState = { ...this.state };
        tempState.cardTypes.map((item, j) => {
            if (id == item.val) {
                return item.selected = true;
            }
            return item.selected = false;
        });
        this.setState({ selectedCardType: id, cardTypes: tempState.cardTypes });

    }
    onTransportaionChanged(cardId, selectedTransportation) {
        axios.get('/Home/GetRoutes',
            { trasnportationId: selectedTransportation })
            .then(routes => {
                this.getRoutes(cardId, selectedTransportation, routes);
            });

    }
    onBoardingTimeChanged(cardId, selectedDate) {

        let prevState = { ...this.state };
        prevState.simulatorCards.map((item, i) => {
            if (item.id == cardId) {
                item.boardingTime = selectedDate;
                return item;
            }
        });
        this.setState({ simulatorCards: prevState.simulatorCards });
    }
    onRouteChanged(cardId, selectedRoute) {
        axios.post('/Home/GetStations',
            { routeId: selectedRoute })
            .then(stations => {
                this.getStations(cardId, selectedRoute, stations);
            });
    }
    onStationChanged(cardId, selectedStation, isCico) {
        let prevState = { ...this.state };
        if (isCico) {
            prevState.simulatorCards.map((item, i) => {
                if (item.id == cardId) {
                    item.checkInStationId = selectedStation;
                    return item;
                }

            });
        }
        else {
            prevState.simulatorCards.map((item, i) => {
                if (item.id == cardId) {
                    item.checkOutStationId = selectedStation;
                    return item;
                }
            });
        }
        this.setState({ simulatorCards: prevState.simulatorCards });
    }
    onRemoveCardCliked(index) {
        const prevState = { ...this.state };
        prevState.simulatorCards.splice(index, 1);
        this.setState({ simulatorCards: prevState.simulatorCards });
    }
    onRunSimulation() {
        const resquestData = this.getFetchSimulationInfo();
        axios.post('/Home/RunSimulation', resquestData)
            .then(result => {
                this.prepareResultOfSimulation(result);
            });
    }
    addNewSimulatorCard() {
        let id = this.state.simulatorCardCounter + 1;
        this.setState(prevState => ({
            simulatorCardCounter: id,
            simulatorCards: [
                ...prevState.simulatorCards,
                {
                    id: id,
                    transportationId: 0,
                    boardingTime: new Date(),
                    checkInStationId: 0,
                    checkOutStationId: 0,
                    routeId: 0,
                    explanation: null,
                    isSuccess: null,
                    stations: [{ value: 0, displayValue: 'Seçiniz' }],
                    routes: [{ value: 0, displayValue: 'Seçiniz' }],

                }
            ]
        }));
    }
    getStations(cardId, routeId, stations) {
        const prevState = { ...this.state };
        prevState.simulatorCards.map((item, i) => {
            if (item.id == cardId) {
                item.stations = stations;
                item.routeId = routeId;
                return item;
            }
        });
        this.setState({ simulatorCards: prevState.simulatorCards });
    }
    getRoutes(cardId, transportationId, routes) {
        let prevState = { ...this.state };
        prevState.simulatorCards.map((item, i) => {
            if (item.id == cardId) {
                item.routes = routes;
                item.transportationId = transportationId;
                return item;
            }
        });
        this.setState({ simulatorCards: prevState.simulatorCards });

    }
    getFetchSimulationInfo() {

        const cardTypeId = this.state.selectedCardType;
        const _simulatorCards = this.state.simulatorCards.map((item) => {
            return {
                id: item.id,
                cardTypeId: cardTypeId,
                transportationId: item.transportationId,
                boardingTime: item.boardingTime,
                routeId: item.routeId,
                checkInStationId: item.checkInStationId,
                checkOutStationId: item.checkOutStationId
            };
        });
        return _simulatorCards;
    }
    prepareResultOfSimulation(result) {
        let total = 0;
        const prevState = { ...this.state };
        prevState.simulatorCards.map((item, i) => {
            item.explanation = result[i].explanation;
            item.isSuccess = result[i].isSuccess;
            total += item.isSuccess ? result[i].fare : 0;
            return item;
        });
      
        this.setState({ simulatorCards: prevState.simulatorCards, fare :total });
    }
    render() {

        let simulator = this.props.error ? <p>Simulator can't be loaded!</p> : <Spinner />;
        let simulatorCards = this.state.simulatorCards.map((simulatorCard, i) => {
         
            return (<SimulatorCard
                key={simulatorCard.id}
                index={i}
                cardId={simulatorCard.id}
                transportaions={this.state.transportations}
                transportationId={simulatorCard.transportationId}
                onTransportaionChanged={this.onTransportaionChanged}
                boardingTime={simulatorCard.boardingTime}
                onBoardingTimeChanged={this.onBoardingTimeChanged}
                routes={simulatorCard.routes}
                routeId={simulatorCard.routeId}
                onRouteChanged={this.onRouteChanged}
                stations={simulatorCard.stations}
                onStationChanged={this.onStationChanged}
                onRemoveCardCliked={this.onRemoveCardCliked}
                checkInStationId={simulatorCard.checkInStationId}
                checkOutStationId={simulatorCard.checkOutStationId}
                explanation={simulatorCard.explanation}
                isSuccess={simulatorCard.isSuccess}
            ></SimulatorCard>)
        }
        );


        if (this.state.loaded) {

            simulator = (
                <div className={classes.Simulator}>
                    <CardTypes cardTypes={this.state.cardTypes} onSelected={this.onCardTypeChanged}></CardTypes>
                    {simulatorCards}
                    <div className={classes.dvFunctions}>
                        <Button children="Yeni" btnType="Default" clicked={this.addNewSimulatorCard}></Button>
                        <Button children={"Tutar : " + this.state.fare} btnType="Success" ></Button>
                        <Button children="Hesapla" btnType="Danger" clicked={this.onRunSimulation}></Button>
                    </div>
                </div>
            );
        }
        return (
            <>{simulator}</>
        );
    }
}
export default withErrorHandler(Simulator, axios);