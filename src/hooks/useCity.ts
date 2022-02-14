import { useToast } from "native-base";
import { useStorage } from "./useStorage";
import { IWeather, useWeather } from "./useWeather";

export interface ICity{
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    weather: IWeather;
    isFavorite: boolean;
}

export interface INewCity{
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    weather: IWeather;
}

export const useCity = () => {
    const toast = useToast();
    const storage = useStorage();
    const weatherStorage = useWeather();

    const validate = (oldValue: ICity[] ,newValue: ICity) => {
        oldValue.map((city)=>{
            if((city.lat === newValue.lat) && (city.lng === newValue.lng)){
                throw new Error("Este item já foi salvo anteriormente.");
            }
        })
    }

    const createCity = async (value: Omit<ICity, "isFavorite" | "weather">, onSuccess: () => void) => {
        try {
            const weather = await weatherStorage.getWeather(value.lat, value.lng);
            const newValue: ICity = {...value , weather, isFavorite: false};
            const data = await storage.getAllData();
            if(data){
                validate(data, newValue);
            }

            await storage.saveData(newValue)

            toast.show({
                status: "success",
                title: "Sucesso",
                description: "Item salvo com sucesso!",
            })

            onSuccess();
        } catch (e: any) {
            toast.show({
                status: "error",
                title: "Erro ao salvar",
                description: e.message || "Ocorreu um erro ao salvar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const editCity = async (value: ICity) => {
        try {
            await storage.editData({lat: value.lat, lng: value.lng}, value);

            toast.show({
                status: "success",
                title: "Sucesso",
                description: "Item editado com sucesso!",
            })
        } catch (e: any) {
            toast.show({
                status: "error",
                title: "Erro ao salvar",
                description: e.message || "Ocorreu um erro ao editar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const getCity = async (lat: number, lng: number): Promise<ICity> => {
        try {
            const data: ICity[] = await storage.getAllData();
            const city = data.filter((value: ICity) => ((value.lat === lat) && (value.lng === lng)))

            return city[0];

        } catch (e: any) {
            throw toast.show({
                status: "error",
                title: "Erro ao buscar cidade",
                description: e.message || "Ocorreu um erro ao buscar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const getAllCity = async(): Promise<ICity[]> => {
        try {
            const data: ICity[] = await storage.getAllData();
            const sortedData = data.sort((current, next)=>{
                if(next.isFavorite > current.isFavorite){
                    return 1;
                }
                if(next.isFavorite < current.isFavorite){
                    return -1;
                }
                return 0;
            })
            return sortedData || [];
        } catch (e: any) {

            throw toast.show({
                status: "error",
                title: "Erro ao buscar cidades",
                description: e.message || "Ocorreu um erro ao buscar as cidades, por favor, tente novamente mais tarde..",
            })
        }
    }

    const updateCityWeather = async (lat: number, lng: number) => {
        try {
            const weather = await weatherStorage.getWeather(lat, lng);
            const city = await getCity(lat, lng);
            const newValue: ICity = {...city , weather};

            await editCity(newValue)

            toast.show({
                status: "success",
                title: "Previsão da cidade atualizada",
                description: "Atualização da cidade feita com sucesso!",
            })
        } catch (e: any) {
            toast.show({
                status: "error",
                title: "Erro ao atualizar previsão",
                description: e.message || "Ocorreu um erro ao salvar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const addCityToFavorite = async (lat: number, lng: number, onSuccess: () => void) => {
        try {
            const city = await getCity(lat, lng);
            const newValue: ICity = {...city , isFavorite: true};

            await editCity(newValue)

            toast.show({
                status: "success",
                title: "Adicionado aos favoritos",
                description: "Cidade adicionada aos favoritos com sucesso!",
            })
            onSuccess();
        } catch (e: any) {
            toast.show({
                status: "error",
                title: "Erro ao atualizar previsão",
                description: e.message || "Ocorreu um erro ao salvar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const removeCityFromFavorite = async (lat: number, lng: number, onSuccess: () => void) => {
        try {
            const city = await getCity(lat, lng);
            const newValue: ICity = {...city, isFavorite: false};

            await editCity(newValue)

            toast.show({
                status: "success",
                title: "Removendo dos favoritos",
                description: "Cidade removida dos favoritos com sucesso!",
            })

            onSuccess();
        } catch (e: any) {
            toast.show({
                status: "error",
                title: "Erro ao atualizar previsão",
                description: e.message || "Ocorreu um erro ao salvar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    return {
        createCity,
        editCity,
        getCity,
        getAllCity,
        updateCityWeather,
        addCityToFavorite,
        removeCityFromFavorite,
    }
};
