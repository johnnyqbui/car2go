import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { createRootNavigator } from "./router";
import { isLoggedIn } from "./auth/_auth";

const C2GStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  state = {
    loggedIn: false
  }

  componentWillMount() {
    isLoggedIn().then()
  }

  render() {
    const { loggedIn } = this.state
    const Layout = createRootNavigator(loggedIn);

    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <C2GStatusBar backgroundColor='white' barStyle="default" />
          <Layout />
        </View>
      </Provider>
    );
  }
}