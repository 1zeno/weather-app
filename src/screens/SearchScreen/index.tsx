import React from "react";
import {
    IconButton,
    Input,
    FlatList,
    Box,
    VStack,
    Flex,
    Heading,
    Text,
} from "native-base";
import { OPEN_WEATHER_MAP_API_KEY, OPENCAGE_API_KEY } from "@env";
import SearchIcon from "../../assets/search.svg";
import LeftArrowIcon from "../../assets/leftArrow.svg";
import opencage from "opencage-api-client";
import { CityCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useCity } from "../../hooks/useCity";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Data {
    formatted: string,
    geometry: {
        lat: number,
        lng: number,
    }
}

export const SearchScreen = () => {
    const navigation = useNavigation();
    const cityStorage = useCity();
    const [ data, setData ] = React.useState<Data[]>([]);
    const [ searchValue, setSearchValue] = React.useState("");

    const onSearch = async() => {
        const result = await opencage.geocode({ q: searchValue, key: OPENCAGE_API_KEY });
        setData(result.results)
    }

    return (
        <>
            <Flex
                background="#3AA7F4"
                p={4}
                flexDirection="row"
                alignItems="center"
            >
                <IconButton
                    background="#3AA7F4"
                    icon={<LeftArrowIcon />}
                    onPress={navigation.goBack}
                />
                <Heading size="sm" color="white" pl={4}>
                    Pesquisar cidade
                </Heading>
            </Flex>
            <VStack background="#FAFAFA" height="100%" pb={"66px"} pt={4} px={4} space={4}>
                <Input
                    background="white"
                    color="gray.800"
                    value={searchValue || ""}
                    onChangeText={setSearchValue}
                    InputRightElement={
                        <IconButton
                            background="#3AA7F4"
                            icon={<SearchIcon />}
                            onPress={onSearch}
                        />
                    }
                />
                <FlatList
                    background="#FAFAFA"
                    data={data}
                    ListEmptyComponent={
                        <Text
                            color="#889AAD"
                            textAlign="center"
                        >
                            {"Nenhum resultado encontrado"}
                        </Text>
                    }
                    renderItem={({ item }) => {
                        const splitFormatted = item.formatted.split(", ");

                        const city = splitFormatted[0];
                        const state = splitFormatted[1];
                        const country = splitFormatted[2];
                        const lat = item.geometry.lat;
                        const lng = item.geometry.lng;

                        return (
                            <Box mb={6}>
                                <CityCard
                                    localization={{
                                        city,
                                        state,
                                        country,
                                        lat,
                                        lng,
                                    }}
                                    onAdd={cityStorage.createCity}
                                />
                            </Box>
                        )
                    }}
                />
            </VStack>
        </>
    )
};