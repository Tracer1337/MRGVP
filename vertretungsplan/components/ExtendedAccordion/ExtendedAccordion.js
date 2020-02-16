import React, { useState } from "react"
import { StyleSheet, LayoutAnimation, View } from "react-native"
import { List } from "react-native-paper"

const t = 500

export default ({ title, expanded, children }) => {
    const [isExpanded, setExpanded] = useState(!!expanded)

    const handlePress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity))
        setExpanded(!isExpanded)
    }

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