import React from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Text,
    VStack,
} from "native-base";
import { format as dateFormat } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pressable } from "react-native";
import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteFilledIcon from "../../assets/favoriteFilled.svg";
import DeleteIcon from "../../assets/delete.svg";
import RefreshIcon from "../../assets/refresh.svg";
import { format } from "../../resources/format";
import { Forecast } from "../../types";


interface IProps {
    forecast: Forecast;
    isCelsius: boolean;
}

export const ForecastCard: React.FC<IProps> = (props) => {

    const {
        forecast,
        isCelsius,
    } = props;

    const treatDate = (value: Date) => {
        const day = new Date(value).getDate();
        const today = new Date().getDate();
        const tomorrow = new Date().getDate() + 1;
    
        if(day === today){
            return "Hoje";
        }

        if(day === tomorrow){
            return "Amanhã";
        }
    
        return format.initialUpperCase(dateFormat(forecast.date, "eee", { locale: ptBR }));
    }

    const treatTemperature = (temperature: number) => {
        return Math.round(temperature);
    }

    React.useEffect(()=>{},[isCelsius]);

    return (
        <Flex
            borderRadius="md"
            bg="#FFFFFF"
            p={4}
            style={{
                elevation: 4,
            }}
        >
            <VStack space={2}>
                <HStack justifyContent="space-between">
                    <Box>
                        <Heading size="sm">
                            {treatDate(forecast.date)}
                        </Heading>
                        <Text>{dateFormat(forecast.date, "d MMMM", { locale: ptBR })}</Text>
                    </Box>
                    <Heading size="md" color="#F17800">
                        { isCelsius ?
                            `${treatTemperature(forecast.currentTemp)}º`
                            :
                            `${treatTemperature(format.toFahrenheit(forecast.currentTemp))}º`
                        }
                    </Heading>
                </HStack>
                <Box>
                    <Text color="#F5A64C">{format.initialUpperCase(forecast.weatherDescription)}</Text>
                    <Text>
                        { isCelsius ?
                            `${treatTemperature(forecast.minTemp)}º - ${treatTemperature(forecast.maxTemp)}º`
                            :
                            `${treatTemperature(format.toFahrenheit(forecast.minTemp))}º - ${treatTemperature(format.toFahrenheit(forecast.maxTemp))}º`
                        }
                    </Text>
                </Box>
            </VStack>
        </Flex>
    )
};