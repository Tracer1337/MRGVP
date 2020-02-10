import React from 'react'
import { View, StyleSheet } from 'react-native'

import TouchableText from "../../components/TouchableText/TouchableText.js"

import Strings from "../../config/strings.json"
import { screens } from "../../App.js"
import { COLORS } from "../../config/constants.js"

const excludeScreens = ["Menu", "Main"]

export default class MenuScreen extends React.Component {
    static navigationOptions = {
        title: Strings.Screens.Menu
    }

    constructor(props){
        super(props)

        this.entries = []
        for(let key in screens){
            if(excludeScreens.includes(key)) continue
            this.entries.push({
                title: Strings.Screens[key],
                link: key
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.entries.map((e, i) => (
                    <TouchableText
                        onPress={() => this.props.navigation.navigate(e.link)}
                        title={e.title}
                        key={`Menu-${i}`}
                    />
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.BACKGROUND
    }
})
