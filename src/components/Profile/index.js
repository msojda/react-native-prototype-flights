import React from 'react';
import {
  Container, Content, Text, Form, Item, Input, Button, Spinner, Thumbnail, H1,
  List, ListItem, Badge
} from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';

class Profile extends React.Component {
  renderEmailVerification() {
    const { emailVerified } = this.props;
    
    if (emailVerified) {
      return <Badge success><Text>OK</Text></Badge>
    } else {
      return <Badge warning><Text>?</Text></Badge>
    }
  }

  render() {
    const { navigation, profile: { picture, isLoading, nickname, updatedAt, email } } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <Container>
        <Content padder>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Thumbnail source={{ uri: picture }} style={{marginRight: 20}} />
            <H1>Hello, {nickname}!</H1>
          </View>
          <List style={{marginTop: 20}}>
            <ListItem>
              <Grid>
                <Col size={1} style={{ flexDirection: 'row' }}>
                  <Text>E-mail</Text>
                </Col>
                <Col size={2} style={{ flexDirection: 'row' }}>
                  <Text style={{ marginRight: 10, fontWeight: 'bold' }}>{email}</Text>
                  {this.renderEmailVerification()}
                </Col>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid>
                <Col size={1} style={{ flexDirection: 'row' }}>
                  <Text>Last updated</Text>
                </Col>
                <Col size={2} style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold' }}>{moment(updatedAt).fromNow()}</Text>
                </Col>
              </Grid>
            </ListItem>
          </List>
          <Button full bordered style={{marginTop: 40}} onPress={() => navigation.navigate('UpdateProfile')}>
            <Text>Edit Profile</Text>
          </Button>
          <Button full bordered style={{marginTop: 10}} onPress={() => navigation.navigate('ChangePassword')}>
            <Text>Change Password</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(
  state => ({ profile: state.auth.profile })
)(Profile);
