import React from 'react';
import { List } from 'native-base';
import ListItem from './ListItem';

const FlightsList = ({airport, flights}) => {
    return (
        <List>
        {flights.map(flight => <ListItem key={flight.FlightNum} flight={flight} />)}
        </List>
    );
}

export default FlightsList;