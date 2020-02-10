import React from "react"
import { View, StyleSheet } from "react-native"
import { IconButton, FAB } from "react-native-paper"

import PaginatedWebview from "../../components/PaginatedWebview/PaginatedWebview.js"
import ListView from "./ListView/ListView.js"
import UserClassDialog from "./UserClassDialog/UserClassDialog.js"

import Strings from "../../config/strings.json"
import generateUrl from "../../utils/generateUrl.js"
import { COLORS } from "../../config/constants.js"

const MODES = {
    LIST: "list",
    WEBVIEW: "webview"
}

const SWITCH_MODE = "switchMode"

export default class MainScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: Strings.Screens.Main,
        headerLeft: () => (
            <IconButton
                onPress={() => navigation.navigate("Menu")}
                icon="menu"
            />
        ),
        headerRight: () => (
            <IconButton
                onPress={navigation.getParam(SWITCH_MODE)}
                icon="chevron-right"
            />
        )
    })

    state = { 
        mode: MODES.LIST, 
        userClassDialogVisible: false ,
        sharedData: null
    }

    switchMode = () => {
        this.setState({mode: this.state.mode === MODES.LIST ? MODES.WEBVIEW : MODES.LIST})
    }

    handleDataReceived = data => {
        this.setState({sharedData: data})
    }

    handlePress = () => {
        this.setState({userClassDialogVisible: true})
    }

    handleDismiss = () => {
        this.setState({userClassDialogVisible: false})
    }

    componentDidMount(){
        this.props.navigation.setParams({[SWITCH_MODE]: this.switchMode})
    }
    
    render(){
        const userClass = null

        if(this.state.mode === MODES.LIST){
            return (
                <View style={styles.container}>
                    <ListView onDataReceived={this.handleDataReceived}/>
                    <FAB
                        style={styles.fab}
                        label={userClass || Strings.UserClassDialog.Title}
                        icon={!userClass && "add"}
                        onPress={this.handlePress}
                    />
                    <UserClassDialog
                        visible={this.state.userClassDialogVisible} 
                        onDismiss={this.handleDismiss}
                        data={this.state.sharedData}
                    />
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
        flex: 1,
        backgroundColor: COLORS.BACKGROUND    
    },

    fab: {
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 12,
        backgroundColor: COLORS.SECONDARY
    }
})