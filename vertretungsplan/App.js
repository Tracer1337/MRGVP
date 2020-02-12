import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

import MainScreen from "./screens/MainScreen/MainScreen.js"
import MenuScreen from "./screens/MenuScreen/MenuScreen.js"
import PrivacyScreen from "./screens/PrivacyScreen/PrivacyScreen.js"
import { COLORS } from './config/constants.js'

const screens = {
  Main: MainScreen,
  Menu: MenuScreen,
  Privacy: PrivacyScreen
}

const AppNavigator = createStackNavigator(
  screens,
  {
    initialRouteName: "Main"
  }
)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.BACKGROUND
  }
}

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    // let ad = "ca-app-pub-3609177996275417/1082785682"
    // if (__DEV__ || Constants.manifest.releaseChannel.indexOf("develop") !== -1) ad = "ca-app-pub-3940256099942544/6300978111"
    return (
      <PaperProvider
        settings={{
          icon: props => <MaterialIcon {...props}/>
        }}
        theme={theme}
      >
        <AppContainer />
        {/*<AdMobBanner
          bannerSize="fullBanner"
          adUnitID={ad}
          didFailToReceiveAdWithError={this.bannerError}
        />*/}
      </PaperProvider>
    )
  }
  // == Ads ==
  // Test key: ca-app-pub-3940256099942544/6300978111
  // Ad key: ca-app-pub-3609177996275417/1082785682
  //{__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-3609177996275417/1082785682"}
  bannerError() {
    return;
  }

  _handleLoadingError = error => {
    console.warn(error);
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }
}

export {
  screens,
  theme
}

export const Icon = MaterialIcon