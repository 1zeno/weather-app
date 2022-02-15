import React from "react";
import { Keyboard } from "react-native";
import {
    IconButton,
    Input,
    FlatList,
    Box,
    VStack,
    Flex,
    Heading,
    Text,
    Spinner,
} from "native-base";
import { OPENCAGE_API_KEY } from "@env";
import opencage from "opencage-api-client";
import SearchIcon from "../../assets/search.svg";
import LeftArrowIcon from "../../assets/leftArrow.svg";
import { SearchCard } from "../../components";
import { useCity } from "../../hooks/useCity";
import { useNavigator } from "../../hooks/useNavigator";
import { NewCity, SerachCity } from "../../types";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchScreen = () => {
    const navigator = useNavigator();
    const cityStorage = useCity();
    const [ data, setData ] = React.useState<SerachCity[]>([]);
    const [ searchValue, setSearchValue] = React.useState("");
    const [ isLoading, setIsLoading ] = React.useState(false);

    const onSearch = async () => {
        setIsLoading(true);
        const searchData = await cityStorage.searchCity(searchValue, () => setIsLoading(false));
        setData(searchData);
        setIsLoading(false);
    }

    const onCreate = async (localization: NewCity) => {
        setIsLoading(true);
        await cityStorage.createCity(
            localization,
            () => navigator.push("HomeScreen"),
            () => setIsLoading(false),
        );
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
                    onPress={navigator.goBack}
                />
                <Heading size="sm" color="white" pl={4}>
                    {"Pesquisar cidade"}
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
                                disabled={isLoading}
                                onPress={()=>{
                                    onSearch();
                                    Keyboard.dismiss();
                                }}
                                
                            />
                        }
                    />
                {isLoading ? (<Spinner marginTop={10} />) : (
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

                            const localization: NewCity = {
                                city,
                                state,
                                country,
                                lat,
                                lng,
                            };

                            return (
                                <Box mb={6}>
                                    <SearchCard
                                        localization={localization}
                                        onAdd={()=>onCreate(localization)}
                                    />
                                </Box>
                            )
                        }}
                    />
                    )}
                </VStack>
        </>
    )
};