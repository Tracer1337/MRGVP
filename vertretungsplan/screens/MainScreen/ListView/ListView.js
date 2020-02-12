import React, { useState, useEffect } from "react"
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native"
import { ActivityIndicator, Text, Title, IconButton } from "react-native-paper"

import InfoElement from "./InfoElement.js"
import PlanElement from "./PlanElement.js"

import Strings from "../../../config/strings.json"
import { STORAGE, FETCH_DATA_TIMEOUT } from "../../../config/constants.js"
import fetchData from "../../../utils/fetchData.js"
import StorageHandler from "../../../utils/StorageHandler.js"

const Header = ({ data }) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{Strings.Source}</Text>
        <Text style={styles.headerText}>{Strings.ListView.Date}{data ? data.date : null}</Text>
    </View>
)

const ReloadAdvicer = ({ visible, onPress }) => visible ? (
    <IconButton icon="refresh" onPress={onPress} style={styles.reloadAdvicer} size={26}/>
) : null

export default ListView = ({ onDataReceived }) => {
    const [data, setData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [loadingState, setLoadingState] = useState(Strings.LoadingStates.Init)
    const [userClass, setUserClass] = useState(null)
    const [fetchDataTimeout, setFetchDataTimeout] = useState(null)
    const [fetchDataTimeoutTrigger, setFetchDataTimeoutTrigger] = useState(false)
    const [cancelToken, setCancelToken] = useState(null)

    const handleLoadingNextPage = (pageNr) => {
        if(fetchDataTimeout){
            clearTimeout(fetchDataTimeout)
        }
        setFetchDataTimeout(setTimeout(() => setFetchDataTimeoutTrigger(true), FETCH_DATA_TIMEOUT))
        setLoadingState(Strings.LoadingStates.LoadingPage.replace("{}", pageNr))
    }

    const load = () => {
        // Reset states / Cancel previous request
        setRefreshing(true)
        handleLoadingNextPage(Strings.LoadingStates.Init)

        try {
            cancelToken.cancel()
        } catch(error) {}

        StorageHandler.getData(STORAGE.USERCLASS).then(data => {
            setUserClass(data)
        })

        let token = {cancel: null}
        setCancelToken(token)

        fetchData(handleLoadingNextPage, token).then(data => {
            clearTimeout(fetchDataTimeout)
            setLoadingState(Strings.LoadingStates.Done)
            requestAnimationFrame(() => {
                if(onDataReceived) onDataReceived(data)
                setRefreshing(false)
                setData(data)
            })
        }).catch(() => null)
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
                        <ReloadAdvicer onPress={load} visible={fetchDataTimeoutTrigger}/>
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

                {userClass && userElements.length ? (
                    <>
                        <Title style={styles.headline}>{Strings.ListView.UserEntries}</Title>
                        {userElements}
                    </>
                ) : null}

                <Title style={styles.headline}>{Strings.ListView.Info}</Title>
                {infoElements}

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

    loadingCaption: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    reloadAdvicer: {
        marginTop: 10,
        transform: [{rotateY: "180deg"}]
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

    spacer: {
        height: 60
    }
})
