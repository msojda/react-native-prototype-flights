import React from 'react';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

const MyNavbar = ({ title }) => {
    return (
        <Header>
            <Left>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right />
        </Header>
    );
}

export default MyNavbar;