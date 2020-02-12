import React from "react"
import { View, StyleSheet } from "react-native"
import { IconButton, FAB, Snackbar } from "react-native-paper"

import PaginatedWebview from "../../components/PaginatedWebview/PaginatedWebview.js"
import ListView from "./ListView/ListView.js"
import UserClassDialog from "./UserClassDialog/UserClassDialog.js"

import Strings from "../../config/strings.json"
import generateUrl from "../../utils/generateUrl.js"
import { COLORS, STORAGE } from "../../config/constants.js"
import StorageHandler from "../../utils/StorageHandler.js"

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
                size={26}
            />
        )
    })

    state = { 
        mode: MODES.LIST, 
        sharedData: null,
        userClass: null,
        userClassDialogVisible: false,
        snackbarVisible: false,
        listViewReloadKey: 0
    }

    switchMode = () => {
        this.setState({mode: this.state.mode === MODES.LIST ? MODES.WEBVIEW : MODES.LIST})
    }

    requestUserClass = () => {
        StorageHandler.getData(STORAGE.USERCLASS).then(value => {
            if(value) {
                this.setState({ userClass: value })
            }
        })
    }

    handleDataReceived = data => {
        this.setState({sharedData: data})
    }

    handlePress = () => {
        this.setState({userClassDialogVisible: true})
    }

    handleDialogDismiss = () => {
        this.setState({userClassDialogVisible: false})
    }

    handleDialogSave = (value) => {
        StorageHandler.storeData(STORAGE.USERCLASS, value).then(success => {
            if(success){
                this.setState({snackbarVisible: true})
                this.setState({userClass: value})
                this.setState({listViewReloadKey: this.state.listViewReloadKey+1})
            }
        })
        this.handleDialogDismiss()
    }

    handleSnackbarDismiss = () => {
        this.setState({snackbarVisible: false})
    }

    componentDidMount(){
        this.props.navigation.setParams({[SWITCH_MODE]: this.switchMode})
        this.requestUserClass()
    }
    
    render(){
        if(this.state.mode === MODES.LIST){
            return (
                <View style={styles.container}>
                    <ListView onDataReceived={this.handleDataReceived} key={this.state.listViewReloadKey}/>
                    <FAB
                        style={styles.fab}
                        label={this.state.userClass || Strings.UserClassDialog.Title}
                        icon={!this.state.userClass && "add"}
                        onPress={this.handlePress}
                    />
                    <UserClassDialog
                        visible={this.state.userClassDialogVisible} 
                        onDismiss={this.handleDialogDismiss}
                        onSave={this.handleDialogSave}
                        data={this.state.sharedData}
                    />
                    <Snackbar
                        visible={this.state.snackbarVisible}
                        onDismiss={this.handleSnackbarDismiss}
                        action={{
                            label: Strings.Accept,
                            onPress: this.handleSnackbarDismiss
                        }}
                    >{Strings.DataStored}</Snackbar>
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