import React from "react"
import { StyleSheet } from "react-native"
import { TouchableRipple, Text } from "react-native-paper"

export default ({onPress, title, style, textStyle, Before}) => (
    <TouchableRipple
        onPress={onPress}
        style={[styles.entry, style]}
    >
        <>
            {Before || null}
            <Text style={[styles.entryTitle, textStyle]}>{title}</Text>
        </>
    </TouchableRipple>
)

const styles = StyleSheet.create({
    entry: {
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    
    entryTitle: {
        fontSize: 20
    }
})
