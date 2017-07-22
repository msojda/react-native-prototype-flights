import React from 'react';
import { Body, Text, H3, Card, CardItem, Icon } from 'native-base';

const ListItem = ({airport}) => {
    return (
        <Card>
            <CardItem header>
                <H3>{airport.airport}</H3>
            </CardItem>
            <CardItem>
                <Body>
                    <Text><Icon name='md-map' style={{fontSize: 18}} /> {airport.city}</Text>
                </Body>
            </CardItem>
        </Card>
    )
}

export default ListItem;