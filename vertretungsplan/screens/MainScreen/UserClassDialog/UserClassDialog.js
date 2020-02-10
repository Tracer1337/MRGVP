import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Dialog, Portal, TextInput, Button, Divider, RadioButton, HelperText } from "react-native-paper"

import { theme } from "../../../App.js"

import Strings from "../../../config/strings.json"

const classesRegex = /(\d{1,2}[a-z]?)|(S\d?\/\d?)/g

export default UserClassDialog = ({ 
    visible, 
    onDismiss,
    data
}) => {
    const [classState, setClassState] = useState(null)
    const [radioValue, setRadioValue] = useState(null)

    const handleRadioValueChange = value => setRadioValue(value)

    const handleClassTextChange = value => setClassState(value)

    const handleDismiss = () => onDismiss(classState)

    const classes = []
    if(data){
        data.plan.forEach((_, cls) => {
            // Extract all classes of the string. Sometimes there are multiple ones in a single string (e.g. 10a, 10b)
            const extracted = cls.match(classesRegex)
            if(extracted){
                classes.push(...extracted)
            }
        })
    }

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleDismiss}
            >
                <Dialog.Title>{Strings.UserClassDialog.Title}</Dialog.Title>

                <Divider/>

                <Dialog.Content>
                    <HelperText>{Strings.UserClassDialog.Helper}</HelperText>
                    <RadioButton.Group
                        value={radioValue}
                        onValueChange={handleRadioValueChange}
                    >
                        {classes.map(cls => (
                            <View style={styles.radioWrapper}>
                                <RadioButton value={cls} color={theme.colors.primary}/>
                                <Text>{cls}</Text>
                            </View>
                        ))}
                    </RadioButton.Group>

                    <TextInput
                        label={Strings.UserClassDialog.TextInputLabel}
                        value={classState}
                        onChangeText={handleClassTextChange}
                        dense
                        mode="outlined"
                    />
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={handleDismiss}>{Strings.UserClassDialog.Save}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    radioWrapper: {
        flexDirection: "row"
    }
})