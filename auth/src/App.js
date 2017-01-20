import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: '' };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDN1xrh0O7k4K4CrKgOHPvlkafwrMY5XqY',
      authDomain: 'authentication-1c532.firebaseapp.com',
      databaseURL: 'https://authentication-1c532.firebaseio.com',
      storageBucket: 'authentication-1c532.appspot.com',
      messagingSenderId: '167673421456'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <CardSection><Button onPress={() => firebase.auth().signOut()}>Log Out</Button></CardSection>;
      case false:
        return <LoginForm />;
      default:
        return <CardSection><Spinner size="large" /></CardSection>;
    }

  }

  render() {
    return(
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
