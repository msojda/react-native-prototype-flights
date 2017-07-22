import React from 'react';
import { Text, ListItem as BaseListItem } from 'native-base';

const ListItem = ({flight}) => {
    const {TailNum} = flight;
    return (
        <BaseListItem>
            <Text>{TailNum}</Text>
        </BaseListItem>
    );
}

export default ListItem;