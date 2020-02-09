import React, { useState, useRef } from "react"
import { Text, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
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

            <View style={styles.footer}>

                <Button
                    onPress={backward}
                    style={styles.chevron}
                    disabled={pageNr <= 1}
                >Vorherige Seite</Button>

                <Button
                    onPress={forward}
                    style={styles.chevron}
                >Nächste Seite</Button>

            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    url: {
        fontSize: 10,
    },
    webview: {
        marginTop: 5
    },
    footer: {
        flex: 1 / 14,
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
        paddingTop: 5,
        borderTopWidth: 1
    },
    switchPage: { flex: 2 },
    chevron: { flex: 1 }
})
