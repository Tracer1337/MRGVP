import AsyncStorage from "@react-native-community/async-storage"

export default class StorageHandler {
    static storeData = async (key, value) => {
        if(value === null) {
            return StorageHandler.removeData(key)
        }
        try {
            await AsyncStorage.setItem(key, value)
            return true
        } catch(e) {
            console.error(e)
            return false
        }
    }

    static getData = async key => {
        try {
            const data = await AsyncStorage.getItem(key)
            if(data !== null) {
                return data
            }
            return false
        } catch(e) {
            console.error(error)
            return false
        }
    }

    static removeData = async key => {
        try {
            await AsyncStorage.removeItem(key)
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }
}