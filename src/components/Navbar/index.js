import React, { Component } from 'react';
import { Header, Left, Button, Icon, Body, Title, Right, Text } from 'native-base';
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

    renderRight() {
        const { onRight, rightTitle } = this.props;

        if (!rightTitle) {
            return <Right />;
        }

        return (
            <Right>
                <Button transparent onPress={onRight}>
                    <Text>{rightTitle}</Text>
                </Button>
            </Right>
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
                {this.renderRight()}
            </Header>
        );
    }
}

export default Navbar;