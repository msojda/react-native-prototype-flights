import React, { Component } from 'react';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Navbar extends Component {
    renderLeft() {
        const { index } = this.props;

        if (index === 0) {
            return <Left />;
        }

        return (
            <Left>
                <Button transparent onPress={Actions.pop}>
                    <Icon name='md-arrow-back' />
                </Button>
            </Left>
        )
    }

    render() {
        const { title } = this.props;

        return (
            <Header>
                {this.renderLeft()}
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}

export default Navbar;