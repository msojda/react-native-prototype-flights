import React from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import chunk from 'lodash/chunk';
import ListItem from './ListItem';

const AirportsList = ({airports}) => {
    const rows = chunk(airports, 2);

    return (
      <Grid>
          {rows.map((row, index) => 
          <Row key={index}>
            {row.map(airport => <Col key={airport.id}><ListItem airport={airport} /></Col>)}
          </Row>
        )} 
      </Grid>
    )
}

export default AirportsList;