import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Dialog, Portal, TextInput, Button, Divider, RadioButton, Caption, Text, IconButton } from "react-native-paper"

import Strings from "../../../config/strings.json"
import { STORAGE, COLORS } from "../../../config/constants.js"
import { theme, Icon } from "../../../App.js"
import StorageHandler from "../../../utils/StorageHandler.js" 

const classesRegex = /(\d{1,2}[a-z]?)|(S\d?\/\d?)/g

export default UserClassDialog = ({ 
    visible, 
    onSave,
    onDismiss,
    data
}) => {
    const [textState, setTextState] = useState(null)
    const [radioState, setRadioState] = useState(null)
    const [hasStateChanged, setHasStateChanged] = useState(false)
    const [classes, setClasses] = useState([])

    const handleRadioValueChange = value => {
        setRadioState(value)
        setHasStateChanged(true)
    }

    const handleTextChange = value => {
        setHasStateChanged(true)
        setTextState(value)
    }

    const handleSave = () => onSave(textState || radioState)

    const handleRemove = () => {
        setRadioState(null)
        setTextState(null)
        setHasStateChanged(true)
    }

    useEffect(() => {
        let newClasses = []
        if (data) {
            data.plan.forEach((_, cls) => {
                // Extract all classes of the string. Sometimes there are multiple ones in a single string (e.g. 10a, 10b)
                const extracted = cls.match(classesRegex)
                if (extracted) {
                    // Prevent including duplicates
                    for (let value of extracted) {
                        if (!newClasses.includes(value)) {
                            newClasses.push(value)
                        }
                    }
                }
            })
        }
        setClasses(newClasses)
    }, [data])

    useEffect(() => {
        if(!visible) {
            setTextState(null)
            setRadioState(null)
            setHasStateChanged(false)
        } else {
            StorageHandler.getData(STORAGE.USERCLASS).then(value => {
                setRadioState(value)
                if(!classes.includes(value)){
                    setClasses([value, ...classes])
                }
            })
        }
    }, [visible])

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={onDismiss}
            >
                <Dialog.Title>{Strings.UserClassDialog.Title}</Dialog.Title>

                <Divider/>

                <Dialog.Content>
                    <Caption>{Strings.UserClassDialog.Helper}</Caption>

                    <RadioButton.Group
                        value={radioState}
                        onValueChange={handleRadioValueChange}
                    >
                        {classes.map((cls, i) => cls && (
                            <View style={styles.radioWrapper} key={i}>
                                <RadioButton value={cls} color={theme.colors.primary}/>
                                <Text style={styles.radioLabel}>{cls}</Text>
                            </View>
                        ))}
                    </RadioButton.Group>

                    <IconButton 
                        onPress={handleRemove} 
                        icon={() => <Icon name="remove-circle-outline" size={24} color={COLORS.RED} />} 
                        style={styles.remove}
                    />

                    <TextInput
                        label={Strings.UserClassDialog.TextInputLabel}
                        value={textState}
                        onChangeText={handleTextChange}
                        dense
                        mode="outlined"
                    />
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={handleSave} disabled={!hasStateChanged}>{Strings.UserClassDialog.Save}</Button>
                    <Button onPress={onDismiss}>{Strings.UserClassDialog.Dismiss}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    radioWrapper: {
        flexDirection: "row"
    },

    radioLabel: {
        marginTop: 7
    },

    remove: {
        margin: 0
    }
})