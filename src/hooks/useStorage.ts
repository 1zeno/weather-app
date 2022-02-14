import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = () => {
    const storageToken = "@weatherapp";

    const saveData = async <DataType>(value: DataType) => {
        const jsonValue = await AsyncStorage.getItem(storageToken);
        if (jsonValue) {
            const parsedOldValue = JSON.parse(jsonValue);
            const stringfiedValue = JSON.stringify([...parsedOldValue, value]);
            await AsyncStorage.setItem(storageToken, stringfiedValue);
        } else {
            const stringfiedValue = JSON.stringify([value]);
            await AsyncStorage.setItem(storageToken, stringfiedValue);
        }
    };

    const editData = async <DataType>(location: { lat: number, lng: number }, data: DataType) => {
        const jsonValue = await AsyncStorage.getItem(storageToken);
        if (jsonValue) {
            const parsedOldValue = JSON.parse(jsonValue);
            const filteredValue = parsedOldValue.filter((value: any)=>(value.lat !== location.lat) && (value.lng !== location.lng));
            const newValue = [...filteredValue, data]
            const stringfiedValue = JSON.stringify(newValue);
            await AsyncStorage.setItem(storageToken, stringfiedValue);
        } 
    };

    const deleteData = async (location: { lat: number, lng: number }) => {
        const jsonValue = await AsyncStorage.getItem(storageToken);
        if (jsonValue) {
            const parsedOldValue = JSON.parse(jsonValue);
            const filteredValue = parsedOldValue.filter((value: any)=>(value.lat !== location.lat) && (value.lng !== location.lng));
            const stringfiedValue = JSON.stringify(filteredValue);
            await AsyncStorage.setItem(storageToken, stringfiedValue);
        } 
    };

    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem(storageToken);
        if (jsonValue) {
            const parsedValue = JSON.parse(jsonValue);
            return parsedValue;
        }
        return null;
    };

    const getAllData = async () => {
        const jsonValue = await AsyncStorage.getItem(storageToken);
        if (jsonValue) {
            const parsedValue = JSON.parse(jsonValue);
            return parsedValue;
        }
        return null;
    };

    return {
        saveData,
        editData,
        deleteData,
        getData,
        getAllData,
    };
};
