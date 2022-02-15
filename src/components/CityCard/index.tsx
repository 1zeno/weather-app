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
import { Pressable } from "react-native";
import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteFilledIcon from "../../assets/favoriteFilled.svg";
import DeleteIcon from "../../assets/delete.svg";
import RefreshIcon from "../../assets/refresh.svg";
import { format } from "../../resources/format";
import { City } from "../../types";

interface IProps {
    city: City;
    isCelsius: boolean;
    onDelete: () => void;
    onRefresh: () => void;
    onPressCard: () => void;
    onFavorite: () => void;
}

export const CityCard: React.FC<IProps> = (props) => {

    const {
        city,
        isCelsius,
        onDelete,
        onRefresh,
        onPressCard,
        onFavorite,
    } = props;

    const treatTemperature = (temperature: number) => {
        return Math.round(temperature);
    }

    return (
        <Pressable onPress={onPressCard}>
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
                            <Heading size="sm">{city.city}</Heading>
                            <Text maxW={150} isTruncated>{city.state}</Text>
                            <Text>{city.country}</Text>
                        </Box>
                        <Heading size="md" color="#F17800">
                            {isCelsius ?
                                `${treatTemperature(city.weather.currentTemp)}º`
                                :
                                `${treatTemperature(format.toFahrenheit(city.weather.currentTemp))}º`
                            }
                        </Heading>
                    </HStack>
                    <HStack>
                        <Box flex={1}>
                            <Text color="#F5A64C">{format.initialUpperCase(city.weather.weatherDescription)}</Text>
                            <Text>
                                {isCelsius ?
                                    `${treatTemperature(city.weather.minTemp)}º - ${treatTemperature(city.weather.maxTemp)}º`
                                    :
                                    `${treatTemperature(format.toFahrenheit(city.weather.minTemp))}º - ${treatTemperature(format.toFahrenheit(city.weather.maxTemp))}º`
                                }
                            </Text>
                        </Box>
                        <IconButton icon={<RefreshIcon />} onPress={onRefresh} />
                        <IconButton icon={<DeleteIcon />} onPress={onDelete} />
                        <IconButton icon={city.isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />} onPress={onFavorite} />
                    </HStack>
                </VStack>
            </Flex>
        </Pressable>
    )
};