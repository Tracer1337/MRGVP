import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Divider, Title } from "react-native-paper"

import ExtendedAccordion from "../../../components/ExtendedAccordion/ExtendedAccordion.js"

import Strings from "../../../config/strings.json"

const Table = ({data, style}) => (
    <View style={style}>
        <Title>{Strings.ListView.Lesson}{data[0]}</Title>
        {data.slice(1).map((value, i) => (
            <View style={styles.tableColumn}>
                <Text style={styles.tableCell}>{Strings.ListView.Entries[i]}</Text>
                <Text style={styles.tableCell}>{value}</Text>
            </View>
        ))}
    </View>
)

export default ({ entries, cls, weekday }) => {
    return (
        <ExtendedAccordion title={!cls.trim() ? Strings.ListView.Misc : cls}>
                <Title style={styles.spacing}>{weekday}</Title>
                <Divider/>
                {entries.map((entry, i) => {
                    const isLastEntry = i < entries.length - 1
                    return (
                        <React.Fragment key={i}>
                            <Table data={entry} key={i} style={[isLastEntry ? styles.spacing : null]}/>
                            {isLastEntry ? <Divider /> : null}
                        </React.Fragment>
                    )
                })}
        </ExtendedAccordion>
    )
}

const styles = StyleSheet.create({
    spacing: {
        marginBottom: 10,
        marginTop: 10
    },

    tableColumn: {
        flex: 1, 
        alignSelf: "stretch", 
        flexDirection: "row"
    },

    tableCell: {
        flex: 1,
        alignSelf: "stretch"
    }
})