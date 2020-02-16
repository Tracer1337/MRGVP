import React from "react"
import { StyleSheet, View } from "react-native"
import { Surface, IconButton, Subheading } from "react-native-paper"

export default Header = ({ scene, previous, navigation }) => {
    const { options } = scene.descriptor
    const title = options.headerTitle || options.title || scene.route.name

    const HeaderLeft = options.headerLeft ? options.headerLeft : previous ? (
        () => <IconButton
            icon="arrow-back"
            onPress={navigation.goBack}
        />
    ) : null

    const HeaderRight = options.headerRight

    return (
        <View style={styles.headerContainer}>
            <Surface style={styles.header}>
                {HeaderLeft && <HeaderLeft navigation={navigation} />}
                <View style={styles.titleWrapper}>
                    <Subheading style={styles.title}>{title}</Subheading>
                </View>
                {HeaderRight && <HeaderRight navigation={navigation} />}
            </Surface>
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
    },

    header: {
        elevation: 3,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 7,
        marginBottom: 0
    },

    titleWrapper: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    
    title: {
        fontSize: 18
    }
})