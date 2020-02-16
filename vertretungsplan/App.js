import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider as PaperProvider, DefaultTheme, IconButton } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

import MainScreen from "./screens/MainScreen/MainScreen.js"
import MenuScreen from "./screens/MenuScreen/MenuScreen.js"
import PrivacyScreen from "./screens/PrivacyScreen/PrivacyScreen.js"
import Header from "./components/Header/Header.js"

import { COLORS } from "./config/constants.js"
import Strings from "./config/strings.json"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.BACKGROUND
  }
}

const Stack = createStackNavigator()

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    return (
      <PaperProvider
        settings={{
          icon: props => <MaterialIcon {...props} />
        }}
        theme={theme}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={Strings.Screens.Main}
            screenOptions={{
              cardStyle: {backgroundColor: COLORS.BACKGROUND},
              header: Header
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
            
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  }

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
  theme
}

export const Icon = MaterialIcon

// Dev AD key: ca-app-pub-3940256099942544/6300978111
// Prod Ad key: ca-app-pub-3609177996275417/1082785682