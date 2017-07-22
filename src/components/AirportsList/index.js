import React from 'react';
import { Spinner } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import chunk from 'lodash/chunk';
import { graphql, gql } from 'react-apollo';
import ListItem from './ListItem';

const AirportsList = ({data}) => {
    if (data.loading) {
      return <Spinner />;
    }

    const { airports } = data;
    const rows = chunk(airports, 2);

    return (
      <Grid>
           {rows.map((row, index) => 
          <Row key={index}>
            {row.map(airport => <Col key={airport._id}><ListItem airport={airport} /></Col>)}
          </Row>
        )}  
      </Grid>
    )
}

const ConnectedAirportsList = graphql(gql`{
  airports(limit:10) {
    _id
    airport
    city
  }
}`)(AirportsList);

export default ConnectedAirportsList;