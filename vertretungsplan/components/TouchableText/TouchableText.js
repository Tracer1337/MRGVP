import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { TouchableRipple, Text } from "react-native-paper"

export default ({onPress, title, style}) => (
    <TouchableRipple
        onPress={onPress}
        style={[styles.entry, style]}
    >
        <Text style={styles.entryTitle}>{title}</Text>
    </TouchableRipple>
)

const styles = StyleSheet.create({
    entry: {
        marginBottom: 8
    },
    entryTitle: {
        fontSize: 24
    }
})
