import React from 'react';
import { Text, H3, Card, CardItem, Icon } from 'native-base';

const ListItem = ({ airport, onPress }) => {
    return (
        <Card style={styles.card}>
            <CardItem header button={true} onPress={onPress}>
                <H3>{airport.airport}</H3>
            </CardItem>
            <CardItem footer>
                <Text><Icon name='md-map' style={styles.icon} /> {airport.city}</Text>
            </CardItem>
        </Card>
    )
}

const styles = {
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    icon: {
        fontSize: 18
    }
};

export default ListItem;