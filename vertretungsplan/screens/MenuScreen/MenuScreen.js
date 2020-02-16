import React from "react"
import { StyleSheet, View } from "react-native"

import TouchableText from "../../components/TouchableText/TouchableText.js"
import { Icon } from "../../App.js"

import Strings from "../../config/strings.json"

const excludeScreens = [Strings.Screens.Main, Strings.Screens.Menu]

export default class MenuScreen extends React.Component {
    constructor(props) {
        super(props)

        this.entries = []
        for(let key in Strings.Screens) {
            const name = Strings.Screens[key]
            const icon = Strings.Icons[key]
            if(!excludeScreens.includes(name)) {
                this.entries.push({name, icon})
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.entries.map((e, i) => (
                    <TouchableText
                        onPress={() => this.props.navigation.navigate(e.name)}
                        title={e.name}
                        Before={<Icon size={20} name={e.icon} style={styles.icon}/>}
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
    },

    icon: {
        margin: 0,
        marginRight: 10
    }
})
