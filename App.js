import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createAppContainer, createStackNavigator } from "react-navigation"
import HomeScreen from "./screens/HomeScreen"
import MenuScreen from "./screens/MenuScreen"
import ImprintScreen from "./screens/ImprintScreen"

const Rootstack = createStackNavigator(
  {
    Home: HomeScreen,
    Menu: MenuScreen,
    Imprint: ImprintScreen
  },
  {
    initialRouteName: "Home"
  }
)

const AppContainer = createAppContainer(Rootstack)

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <AppContainer />
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        //require('./assets/images/robot-dev.png'),
      ]),
      Font.loadAsync({
        'fa_regular_400': require('./assets/fonts/fa-regular-400.ttf'),
        'fa_solid_900': require('./assets/fonts/fa-solid-900.ttf'),
        'fa_brands_400': require('./assets/fonts/fa-brands-400.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
