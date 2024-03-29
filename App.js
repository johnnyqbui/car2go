import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { createRootNavigator } from "./routes/router";
import { isLoggedIn } from "./auth/_auth";
import { darkBlue } from './utils/colors'
import reducer from './reducers'

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
    isLoggedIn().then( res => console.log('auto login, set to do nothing for now', res))
  }

  render() {
    const { loggedIn } = this.state
    const Layout = createRootNavigator(loggedIn);

    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <C2GStatusBar backgroundColor='white' barStyle="dark-content" />
          <Layout />
        </View>
      </Provider>
    );
  }
}