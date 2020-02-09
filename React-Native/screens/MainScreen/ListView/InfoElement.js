import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Divider } from "react-native-paper"

import ExtendedAccordion from "../../../components/ExtendedAccordion/ExtendedAccordion.js"

export default ({entries, weekday}) => {
    return (
        <ExtendedAccordion title={weekday}>
                {entries.map((entry, i) => {
                    const isLastEntry = i < entries.length - 1
                    return (
                        <>
                            <View style={[isLastEntry ? styles.spacing : null]} key={i}>
                                <Text>{entry}</Text>
                            </View>
                            {isLastEntry ? <Divider/> : null}
                        </>
                    )
                })}
        </ExtendedAccordion>
    )
}

const styles = StyleSheet.create({
    surface: {
        elevation: 3,
        margin: 10,
        padding: 10,
        paddingTop: 0
    },
    
    spacing: {
        marginBottom: 10,
        marginTop: 10
    }
})