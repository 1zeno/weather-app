import { useToast } from "native-base";
import { OPENCAGE_API_KEY } from "@env";
import opencage from "opencage-api-client";
import { City, SerachCity } from "../types";
import { useStorage } from "./useStorage";
import { useWeather } from "./useWeather";

export const useCity = () => {
    const toast = useToast();
    const storage = useStorage();
    const weatherStorage = useWeather();

    const validate = (oldValue: City[] ,newValue: City) => {
        oldValue.map((city)=>{
            if((city.lat === newValue.lat) && (city.lng === newValue.lng)){
                throw new Error("Este item já foi salvo anteriormente.");
            }
        })
    }

    const createCity = async (value: Omit<City, "isFavorite" | "weather">, onSuccess: () => void, onError: () => void) => {
        try {
            const weather = await weatherStorage.getWeather({lat: value.lat, lng: value.lng});
            const newValue: City = {...value , weather, isFavorite: false};
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

            onSuccess()
        } catch (e: any) {
            onError();

            toast.show({
                status: "error",
                title: "Erro ao salvar",
                description: e.message || "Ocorreu um erro ao salvar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const editCity = async (value: City) => {
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

    const deleteCity = async (indentity: {lat: number, lng: number}, onError?: () => void) => {
        try {
            await storage.deleteData(indentity);

            toast.show({
                status: "success",
                title: "Sucesso",
                description: "Item deletado com sucesso!",
            })
        } catch (e: any) {
            if(onError){
                onError();
            }
            toast.show({
                status: "error",
                title: "Erro ao deletar",
                description: e.message || "Ocorreu um erro ao deletar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const getCity = async (identity: {lat: number, lng: number}): Promise<City> => {
        try {
            const data: City[] = await storage.getAllData();
            const city = data.filter((value: City) => ((value.lat === identity.lat) && (value.lng === identity.lng)))

            return city[0];

        } catch (e: any) {
            throw toast.show({
                status: "error",
                title: "Erro ao buscar cidade",
                description: e.message || "Ocorreu um erro ao buscar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const getAllCity = async(onError: () => void): Promise<City[]> => {
        try {
            const data: City[] | null = await storage.getAllData();

            if(!data){
                throw new Error("Ainda há cidades cadastradas.")
            }
    
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
            onError();

            throw toast.show({
                status: "error",
                title: "Erro ao buscar cidades",
                description: e.message || "Ocorreu um erro ao buscar as cidades, por favor, tente novamente mais tarde..",
            })
        }
    }

    const updateCityWeather = async (identity: {lat: number, lng: number}) => {
        try {
            const weather = await weatherStorage.getWeather(identity);
            const city = await getCity(identity);
            const newValue: City = {...city , weather};

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

    const addCityToFavorite = async (identity: {lat: number, lng: number}, onSuccess: () => void) => {
        try {
            const city = await getCity(identity);
            const newValue: City = {...city , isFavorite: true};

            await editCity(newValue)

            toast.show({
                status: "success",
                title: "Adicionado aos favoritos",
                description: "Cidade adicionada aos favoritos com sucesso!",
            })

            onSuccess()
        } catch (e: any) {
            toast.show({
                status: "error",
                title: "Erro ao atualizar previsão",
                description: e.message || "Ocorreu um erro ao salvar a cidade, por favor, tente novamente mais tarde.",
            })
        }
    };

    const removeCityFromFavorite = async (identity: {lat: number, lng: number}, onSuccess: () => void) => {
        try {
            const city = await getCity(identity);
            const newValue: City = {...city, isFavorite: false};

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

    const searchCity = async (searchValue: string, onError: () => void): Promise<SerachCity[]> => {
        try{
            const searchResult = await opencage.geocode({ q: searchValue, key: OPENCAGE_API_KEY });
            return searchResult.results;
        }catch(e: any){
            onError();

            throw toast.show({
                status: "error",
                title: "Erro ao buscar cidades",
                description: e.message || "Ocorreu um erro ao buscar as cidades.",
            })
        }
    }

    return {
        createCity,
        editCity,
        deleteCity,
        getCity,
        getAllCity,
        updateCityWeather,
        addCityToFavorite,
        removeCityFromFavorite,
        searchCity,
    }
};
