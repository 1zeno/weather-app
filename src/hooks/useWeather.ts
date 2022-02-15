import axios from "axios";
import { OPEN_WEATHER_MAP_API_KEY } from "@env";
import { useToast } from "native-base";
import { Forecast, Weather } from "../types";

export const useWeather = () => {
    const toast = useToast();

    const getWeather = async (identity: {lat: number, lng: number}): Promise<Weather> => {
        try{
            const result = await axios("https://api.openweathermap.org/data/2.5/weather",{
                params: {
                    appid: OPEN_WEATHER_MAP_API_KEY,
                    lat: identity.lat,
                    lon: identity.lng,
                    units: "metric",
                    lang: "pt_br",
                }
            });
            const weather = result.data;

            return {
                minTemp: weather.main.temp_min,
                maxTemp: weather.main.temp_max,
                currentTemp: weather.main.temp,
                weatherDescription: weather.weather[0].description,
            }
        }catch(e){
            throw toast.show({
                status: "error",
                title: "Erro ao buscar clima",
                description: "Ocorreu um erro inesperado, por favor, tente novamente mais tarde.",
            })
        }
    };

    const getForecast = async (identity: {lat: number, lng: number}): Promise<Forecast[]> => {
        try{
            const result = await axios("https://api.openweathermap.org/data/2.5/onecall",{
                params: {
                    appid: OPEN_WEATHER_MAP_API_KEY,
                    lat: identity.lat,
                    lon: identity.lng,
                    exclude: ["hourly", "minutely", "alerts"],
                    units: "metric",
                    lang: "pt_br",
                }
            });

            const weathers = result.data.daily;

            const forecast: Forecast[] = weathers.map((value: any)=>{
            
                return {
                    minTemp: value.temp.min,
                    maxTemp: value.temp.max,
                    currentTemp: value.temp.day,
                    weatherDescription: value.weather[0].description,
                    date: new Date(value.dt * 1000),
                }
            })

            return forecast;

        }catch(e){
            throw toast.show({
                status: "error",
                title: "Erro ao buscar clima",
                description: "Ocorreu um erro inesperado, por favor, tente novamente mais tarde.",
            })
        }
    };

    return {
        getWeather,
        getForecast,
    }
};
