import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Icon, Constants } from 'expo'
import { AdMobBanner } from "expo-ads-admob"
import * as Font from "expo-font"
import { createAppContainer, createStackNavigator } from "react-navigation"
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'

import HomeScreen from "./screens/HomeScreen"
import MenuScreen from "./screens/MenuScreen"
import ContactScreen from "./screens/ContactScreen"
import CalenderScreen from "./screens/CalenderScreen"
import PrivacyScreen from "./screens/PrivacyScreen"
import FeedbackScreen from "./screens/FeedbackScreen"

const Rootstack = createStackNavigator(
  {
    Home: HomeScreen,
    Menu: MenuScreen,
    Contact: ContactScreen,
    Calender: CalenderScreen,
    Privacy: PrivacyScreen,
    Feedback: FeedbackScreen
  },
  {
    initialRouteName: "Home"
  }
)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#F44336",
    // accent: "#F44336",
    // background: "#F44336",
    // surface: "#F44336",
    // text: "#F44336",
    // disabled: "#F44336",
    // placeholder: "#F44336",
    // backdrop: "#F44336"
  }
}

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
      // IF DEVELOPMENT MODE OR DEVELOP APP RELEASE SHOW TEST AD
      if(__DEV__ || Constants.manifest.releaseChannel.indexOf("develop") !== -1) var ad = "ca-app-pub-3940256099942544/6300978111"
      else var ad = "ca-app-pub-3609177996275417/1082785682"
      return (
        <PaperProvider theme={theme}>
          <AppContainer />
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={ad}
            didFailToReceiveAdWithError={this.bannerError}
          />
        </PaperProvider>
      );
    }
  }
  // ---ADS---
  //TEST KEY: ca-app-pub-3940256099942544/6300978111
  //AD KEY: ca-app-pub-3609177996275417/1082785682
  //{__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-3609177996275417/1082785682"}
  bannerError(){
    return;
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
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
