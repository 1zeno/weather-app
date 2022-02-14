import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
    Box,
    Flex,
    Heading,
    VStack,
    Text,
    IconButton,
    FlatList,
} from "native-base";
import SearchIcon from "../../assets/search.svg";
import { CityCard } from "../../components";
import { ICity, useCity } from "../../hooks/useCity";

export const HomeScreen = () => {

    const [data, setData] = React.useState<ICity[]>([]);
    const isFocused = useIsFocused();
    const cityStorage = useCity();
    const navigation = useNavigation();
    const emptyTitle = `Parece que você ainda não
    adicionou uma cidade`;
    const emptyText = `Tente adicionar uma cidade usando o botão
    de busca`;

    const fetch = async () => {
        const cities = await cityStorage.getAllCity();
        setData(cities);
        console.log(cities);
    }

    React.useEffect(() => {
        if (isFocused) {
            fetch();
        }
    }, [isFocused])

    return (
        <>
            <Flex
                background="#3AA7F4"
                p={4}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text color="white">Cidades</Text>
                <IconButton icon={<SearchIcon />} onPress={() => navigation.navigate("SearchScreen")} />
            </Flex>
            <Box background="#FAFAFA" height="100%" p={4}>
                <FlatList
                    background="#FAFAFA"
                    data={data}
                    ListEmptyComponent={
                        <VStack p={4} space={2}>
                            <Heading
                                size="sm"
                                textAlign="center"
                            >
                                {emptyTitle}
                            </Heading>
                            <Text
                                color="#889AAD"
                                textAlign="center"
                            >
                                {emptyText}
                            </Text>
                        </VStack>
                    }
                    renderItem={({ item }) => (
                        <Box mb={6}>
                            <CityCard
                                localization={{
                                    city: item.city,
                                    state: item.state,
                                    country: item.country,
                                    lat: item.lat,
                                    lng: item.lng,
                                }}
                                maxTemp={item.weather.maxTemp}
                                minTemp={item.weather.minTemp}
                                currentTemp={item.weather.currentTemp}
                                weatherDescription={item.weather.weatherDescription}
                                isFavorite={item.isFavorite}
                                onPressCard={() => navigation.navigate("DetailsScreen", { lat: item.lat, lng: item.lng })}
                            />
                        </Box>
                    )
                    }
                />
            </Box>
        </>
    );
};
