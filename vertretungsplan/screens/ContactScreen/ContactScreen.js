import React from "react"
import { StyleSheet, View } from "react-native"

import TouchableText from "../../components/TouchableText/TouchableText.js"
import { Icon } from "../../App.js"

import Strings from "../../config/strings.json"

export default class ContactScreen extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <TouchableText
                    title={Strings.Contact.Name}
                    textStyle={styles.text}
                    Before={<Icon
                        name="person-outline"
                        size={20}
                        style={styles.icon}
                    />}
                />
                <TouchableText
                    title={Strings.Contact.Email}
                    textStyle={styles.text}
                    Before={<Icon
                        name="mail-outline"
                        size={20}
                        style={styles.icon}
                    />}
                />
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
    },

    text: {
        fontSize: 18
    }
})