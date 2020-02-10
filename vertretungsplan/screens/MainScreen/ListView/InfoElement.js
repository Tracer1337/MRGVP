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
                        <React.Fragment key={i}>
                            <View style={styles.spacing}>
                                <Text>{entry}</Text>
                            </View>
                            {isLastEntry ? <Divider/> : null}
                        </React.Fragment>
                    )
                })}
        </ExtendedAccordion>
    )
}

const styles = StyleSheet.create({
    spacing: {
        margin: 10
    }
})