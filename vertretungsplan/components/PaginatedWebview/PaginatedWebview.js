import React, { useState, useRef } from "react"
import { Text, StyleSheet, View } from "react-native"
import { IconButton, Divider } from "react-native-paper"
import { WebView } from "react-native-webview"

export default ({ generateUrl, normalizeContent, sourceString }) => {
    const [pageNr, setPageNr] = useState(1)
    const webview = useRef()

    const init = () => {
        if(normalizeContent){
            webview.current.injectJavaScript("window.stop();const meta=document.createElement('meta');meta.setAttribute('content','width=device-width,initial-scale=0.5,maximum-scale=0.5,user-scalable=0');meta.setAttribute('name','viewport');document.getElementsByTagName('head')[0].appendChild(meta);")
        }
    }

    const forward = () => setPageNr(pageNr + 1)

    const backward = () => setPageNr(Math.max(pageNr - 1, 1))

    const url = generateUrl(pageNr)

    return (
        <React.Fragment>
            <Text style={styles.url}>{sourceString}</Text>

            <WebView
                ref={webview}
                source={{ uri: url }}
                onLoadEnd={init}
                style={styles.webview}
            />

            <Divider/>

            <View style={styles.footer}>

                <IconButton
                    onPress={backward}
                    style={styles.chevron}
                    disabled={pageNr <= 1}
                    icon="arrow-back"
                />

                <IconButton
                    onPress={forward}
                    style={styles.chevron}
                    icon="arrow-forward"
                />

            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    url: {
        fontSize: 10,
        margin: 5
    },

    webview: {
        marginTop: 5
    },

    footer: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white"
    },

    chevron: {
    },

    switchPage: {
        flex: 2
    }
})
