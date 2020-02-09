import React from "react"
import { StyleSheet } from "react-native"
import { List, Surface } from "react-native-paper"

export default ({title, children}) => (
    <List.Accordion title={title}>
        <Surface style={styles.surface}>
            {children}
        </Surface>
    </List.Accordion>
)

const styles = StyleSheet.create({
    surface: {
        elevation: 3,
        margin: 10,
        padding: 10,
        paddingTop: 0
    }
})