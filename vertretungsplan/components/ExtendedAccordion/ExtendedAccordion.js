import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { List } from "react-native-paper"

export default ({ title, expanded, children }) => {
    const [isExpanded, setExpanded] = useState(!!expanded)

    const handlePress = () => setExpanded(!isExpanded)

    return (
        <List.Accordion 
            title={title}
            expanded={isExpanded}
            onPress={handlePress}
        >
            <View style={styles.spacer}>
                {children}
            </View>
        </List.Accordion>
    )
}

const styles = StyleSheet.create({
    spacer: {
        paddingLeft: 10,
        paddingRight: 10
    }
})