import React from "react"
import { StyleSheet, View } from "react-native"
import { List } from "react-native-paper"

export default ({title, children}) => (
    <List.Accordion title={title}>
        <View style={styles.spacer}>
            {children}
        </View>
    </List.Accordion>
)

const styles = StyleSheet.create({
    spacer: {
        paddingLeft: 10,
        paddingRight: 10
    }
})