import React from "react"
import { NativeModules } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider as PaperProvider, DefaultTheme, IconButton } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { AdMobBanner } from "react-native-admob"

import MainScreen from "./screens/MainScreen/MainScreen.js"
import MenuScreen from "./screens/MenuScreen/MenuScreen.js"
import PrivacyScreen from "./screens/PrivacyScreen/PrivacyScreen.js"
import ContactScreen from "./screens/ContactScreen/ContactScreen.js"
import Header from "./components/Header/Header.js"

import { COLORS, DEV, AD_KEYS } from "./config/constants.js"
import Strings from "./config/strings.json"

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.BACKGROUND
  }
}

const Stack = createStackNavigator()

const Icon = props => <MaterialIcon {...props} />

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    return (
      <PaperProvider
        settings={{
          icon: Icon
        }}
        theme={theme}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={Strings.Screens.Main}
            headerMode="float"
            screenOptions={{
              cardStyle: {backgroundColor: COLORS.BACKGROUND},
              header: Header,
              headerStyle: {
                height: 58
              }
            }}
          >

            <Stack.Screen 
              name={Strings.Screens.Main} 
              component={MainScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <IconButton
                    icon="menu"
                    onPress={() => navigation.navigate(Strings.Screens.Menu)}
                  />
                )
              })}
            />

            <Stack.Screen name={Strings.Screens.Menu} component={MenuScreen}/>
            
            <Stack.Screen name={Strings.Screens.Privacy} component={PrivacyScreen}/>

            <Stack.Screen name={Strings.Screens.Contact} component={ContactScreen}/>
            
          </Stack.Navigator>
        </NavigationContainer>
          
        <AdMobBanner
          adSize="fullBanner"
          adUnitID={DEV ? AD_KEYS.TEST : AD_KEYS.PROD}
          onAdFailedToLoad={error => console.log("[App] AdMob Error", error)}
        />

      </PaperProvider>
    )
  }
}

export {
  theme,
  Icon
}