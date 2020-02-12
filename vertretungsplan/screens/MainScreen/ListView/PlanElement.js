import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Divider, Title, Surface } from "react-native-paper"

import ExtendedAccordion from "../../../components/ExtendedAccordion/ExtendedAccordion.js"

import Strings from "../../../config/strings.json"

const Table = ({data, style}) => (
    <View style={style}>
        <Title>{Strings.ListView.Lesson}{data[0]}</Title>
        {data.slice(1).map((value, i) => (
            <View style={styles.tableColumn} key={i}>
                <Text style={styles.tableCell0}>{Strings.ListView.Entries[i]}</Text>
                <Text style={styles.tableCell1}>{value}</Text>
            </View>
        ))}
    </View>
)

export default ({ entries, cls, weekday, raw, showWeekday }) => {
    const children = (
        <>
            {showWeekday && (
                <>
                    <Title style={styles.title}>{weekday}</Title>
                    <Divider />
                </>
            )}
            {
                entries.map((entry, i) => {
                    const isLastEntry = i < entries.length - 1
                    return (
                        <Surface style={styles.surface} key={i}>
                            <Table data={entry} key={i} />
                        </Surface>
                    )
                })
            }
        </>
    )

    if(raw) return children
    return (
        <ExtendedAccordion title={!cls.trim() ? Strings.ListView.Misc : cls}>
            {children}
        </ExtendedAccordion>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center"
    },

    tableColumn: {
        flex: 1, 
        alignSelf: "stretch", 
        flexDirection: "row"
    },

    tableCell0: {
        flex: 1,
        alignSelf: "stretch"
    },

    tableCell1: {
        flex: 2,
        alignSelf: "stretch"
    },

    surface: {
        elevation: 3,
        padding: 10,
        paddingTop: 3,
        margin: 10
    }
})