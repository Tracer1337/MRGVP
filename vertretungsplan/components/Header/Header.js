import React from "react"
import { StyleSheet, View, Animated } from "react-native"
import { Surface, IconButton, Subheading } from "react-native-paper"

import { COLORS } from "../../config/constants.js"

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

    const progress = Animated.add(scene.progress.current, scene.progress.next || 0)

    const opacity = progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0]
    })

    return (
        <Animated.View style={[styles.headerContainer, {opacity}]}>
            <Surface style={styles.header}>
                {HeaderLeft && <HeaderLeft navigation={navigation} />}
                <View style={styles.titleWrapper}>
                    <Subheading style={styles.title}>{title}</Subheading>
                </View>
                {HeaderRight && <HeaderRight navigation={navigation} />}
            </Surface>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: COLORS.BACKGROUND
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