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
import { format } from "../../resources/format";
import { INewCity } from "../../hooks/useCity";

interface IProps {
    localization: Omit<INewCity, "weather">;
    minTemp?: number;
    maxTemp?: number;
    currentTemp?: number;
    weatherDescription?: string;
    isFavorite?: boolean;
    onAdd?: (value: Omit<INewCity, "weather">) => void;
    onPressCard?: () => void;
}

export const CityCard: React.FC<IProps> = (props) => {

    const {
        localization,
        minTemp,
        maxTemp,
        currentTemp,
        weatherDescription,
        isFavorite,
        onAdd,
        onPressCard,
    } = props;

    const hasWeatherInfo = minTemp && maxTemp && currentTemp && weatherDescription;

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
                            <Heading size="sm">{localization.city}</Heading>
                            <Text maxW={100} isTruncated>{localization.state}</Text>
                            <Text>{localization.country}</Text>
                        </Box>
                        {hasWeatherInfo && (
                            <Heading size="md" color="#F17800">{`${Math.round(currentTemp)}º`}</Heading>
                        )}
                    </HStack>
                    {hasWeatherInfo && (
                        <HStack justifyContent="space-between">
                            <Box>
                                <Text color="#F5A64C">{format.initialUpperCase(weatherDescription)}</Text>
                                <Text>{`${Math.round(minTemp)}º - ${Math.round(maxTemp)}º`}</Text>
                            </Box>
                            {isFavorite !== undefined && (
                                <Box>
                                    <IconButton icon={isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />} onPress={() => {}} />
                                </Box>
                            )}
                        </HStack>
                    )}
                </VStack>
                {onAdd && (
                    <Button variant="link" onPress={() => onAdd(localization)}>Adicionar</Button>
                )}
            </Flex>
        </Pressable>
    )
};