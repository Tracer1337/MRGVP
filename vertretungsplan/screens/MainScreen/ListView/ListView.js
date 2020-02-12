import React, { useState, useEffect, useLayoutEffect } from "react"
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native"
import { ActivityIndicator, Text, Title } from "react-native-paper"

import InfoElement from "./InfoElement.js"
import PlanElement from "./PlanElement.js"

import Strings from "../../../config/strings.json"
import { STORAGE } from "../../../config/constants.js"
import fetchData from "../../../utils/fetchData.js"
import StorageHandler from "../../../utils/StorageHandler.js"

const Header = ({data}) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{Strings.Source}</Text>
        <Text style={styles.headerText}>{Strings.ListView.Date}{data ? data.date : null}</Text>
    </View>
)

export default ListView = ({ onDataReceived }) => {
    const [data, setData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [loadingState, setLoadingState] = useState(Strings.LoadingStates.Init)
    const [userClass, setUserClass] = useState(null)

    const handleLoadingNextPage = (pageNr) => setLoadingState(Strings.LoadingStates.LoadingPage.replace("{}", pageNr))

    const load = () => {
        setRefreshing(true)

        StorageHandler.getData(STORAGE.USERCLASS).then(data => {
            setUserClass(data)
        })

        fetchData(handleLoadingNextPage).then(data => {
            setLoadingState(Strings.LoadingStates.Done)
            requestAnimationFrame(() => {
                if(onDataReceived) onDataReceived(data)
                setRefreshing(false)
                setData(data)
            })
        })
    }

    useEffect(load, [])

    let infoElements = []
    let planElements = []
    let userElements = []

    if(!data) {
        return (
            <>
                <Header/>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"/>
                    <View style={styles.loadingCaption}>
                        <Text>{loadingState}</Text>
                    </View>
                </View>
            </>
        )
    } else {
        // Create info elements from data
        data.info.forEach((entries, weekday) => 
            infoElements.push(
                <InfoElement 
                    entries={entries}
                    weekday={weekday}
                    key={weekday}
                />
            )
        )

        let prevWeekday = null

        // Create plan elements from data
        data.plan.forEach((weekdays, cls) => 
            weekdays.forEach((entries, weekday) => {
                const props = {entries, cls, weekday, key: cls+weekday}
                if(userClass && cls.includes(userClass)){
                    userElements.push(<PlanElement {...props} raw showWeekday={prevWeekday === null || prevWeekday !== weekday}/>)
                    prevWeekday = weekday
                }
                planElements.push(<PlanElement {...props}/>)
            })
        )
    }

    // Klasse / Stunde / Vertreter / Fach / Raum / Kommentar
    return (
        <>
            {refreshing ? <Text style={styles.refresh}>{loadingState}</Text> : null}

            <Header data={data}/>

            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={load}
                    />
                }
                >

                <Title style={styles.headline}>{Strings.ListView.Info}</Title>
                {infoElements}

                {userClass && (
                    <>
                        <Title style={styles.headline}>{Strings.ListView.UserEntries}</Title>
                        {userElements}
                    </>
                )}

                <Title style={styles.headline}>{Strings.ListView.Plan}</Title>
                {planElements}
                
                <View style={styles.spacer}/>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },

    container: {
    },

    entryContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    refresh: {
        margin: 5
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5
    },

    headerText: {
        fontSize: 10
    },

    headline: {
        marginLeft: 10
    },

    loadingCaption: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },

    spacer: {
        height: 60
    }
})
