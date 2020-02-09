import React from "react"
import { View, StyleSheet } from "react-native"
import { Button } from "react-native-paper"

import PaginatedWebview from "../../components/PaginatedWebview/PaginatedWebview.js"
import ListView from "./ListView/ListView.js"

import Strings from "../../config/strings.json"
import generateUrl from "../../utils/generateUrl.js"

const MODES = {
    LIST: "list",
    WEBVIEW: "webview"
}

const SWITCH_MODE = "switchMode"

export default class MainScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: Strings.Screens.Main,
        headerLeft: () => (
            <Button
                onPress={() => navigation.navigate("Menu")}
            >Menu</Button>
        ),
        headerRight: () => (
            <Button
                onPress={navigation.getParam(SWITCH_MODE)}
            >Switch</Button>
        )
    })

    state = { mode: MODES.LIST }

    switchMode(){
        this.setState({mode: this.state.mode === MODES.LIST ? MODES.WEBVIEW : MODES.LIST})
    }

    componentDidMount(){
        this.props.navigation.setParams({[SWITCH_MODE]: this.switchMode.bind(this)})
    }
    
    render(){
        if(this.state.mode === MODES.LIST){
            return (
                <View style={styles.container}>
                    <ListView/>
                </View>
            )
        }

        if(this.state.mode === MODES.WEBVIEW){
            return (
                <View style={styles.container}>
                    <PaginatedWebview
                        normalizeContent
                        generateUrl={generateUrl}
                        sourceString={Strings.Source}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})