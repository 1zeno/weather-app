import React from "react";
import {
    IconButton,
    Input,
    FlatList,
    useDisclose,
    Box,
    VStack,
    Flex,
    Heading,
} from "native-base";
import { OPEN_WEATHER_MAP_API_KEY, OPENCAGE_API_KEY } from "@env";
import SearchIcon from "../../assets/search.svg";
import LeftArrowIcon from "../../assets/leftArrow.svg";
import opencage from "opencage-api-client";
import { CityCard } from "../../components";
import { useNavigation } from "@react-navigation/native";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchScreen = () => {
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const navigation = useNavigation();
    const [ data, setData ] = React.useState([]);
    const [ searchValue, setSearchValue] = React.useState("");

    const onSearch = async() => {
        const result = await opencage.geocode({ q: searchValue, key: OPENCAGE_API_KEY });
        setData(result.results)
        // const uhul = await axios(`api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${OPEN_WEATHER_MAP_API_KEY}`)
        // console.log(uhul)
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
            <VStack background="#FAFAFA" height="100%" pb={12} pt={4} px={4} space={4}>
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
                    renderItem={({
                        item, index, separators
                    }) => {
                        const splitFormatted = item.formatted.split(", ");
                        const city = splitFormatted[0];
                        const state = splitFormatted[1];
                        const country = splitFormatted[2];

                        return (
                            <Box  mb={6}>
                                <CityCard
                                    city={city}
                                    state={state}
                                    country={country}
                                />
                            </Box>
                        )
                        }
                    }
                />
            </VStack>
        </>
    )
};