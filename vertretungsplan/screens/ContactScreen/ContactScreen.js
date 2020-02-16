import React from "react"
import { View, StyleSheet } from "react-native"
import { IconButton, Text } from "react-native-paper"

import Strings from "../../config/strings.json"

export default class ContactScreen extends React.Component{
    render(){
        return (
            <View>
                <View style={styles.column}>
                    <IconButton 
                        icon="person-outline" 
                        size={26}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>{Strings.Contact.Name}</Text>
                </View>
                <View style={styles.column}>
                    <IconButton 
                        icon="mail-outline" 
                        size={26}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>{Strings.Contact.Email}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    column: {
        flexDirection: "row",
        alignItems: "center"    
    },

    icon: {
        margin: 0
    },

    text: {
        fontSize: 16
    }
})