/**
 * @flow
 */

import { AppRegistry, YellowBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import "react-native-gesture-handler"

YellowBox.ignoreWarnings([
    "We found non-serializable values in the navigation state"
])

AppRegistry.registerComponent(appName, () => App)
