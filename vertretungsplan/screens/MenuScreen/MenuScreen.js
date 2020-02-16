import React from 'react'
import { View, StyleSheet } from 'react-native'

import TouchableText from "../../components/TouchableText/TouchableText.js"

import Strings from "../../config/strings.json"

const excludeScreens = [Strings.Screens.Main, Strings.Screens.Menu]

export default class MenuScreen extends React.Component {
    constructor(props) {
        super(props)

        this.entries = []
        for(let name of Object.values(Strings.Screens)) {
            if(!excludeScreens.includes(name)) {
                this.entries.push(name)
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.entries.map((name, i) => (
                    <TouchableText
                        onPress={() => this.props.navigation.navigate(name)}
                        title={name}
                        key={"Menu-"+i}
                    />
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})
