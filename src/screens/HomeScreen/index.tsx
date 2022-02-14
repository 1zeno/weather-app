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
    Spinner,
} from "native-base";
import AddIcon from "../../assets/add.svg";
import { CityCard } from "../../components";
import { ICity, useCity } from "../../hooks/useCity";

export const HomeScreen = () => {

    const [data, setData] = React.useState<ICity[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const isFocused = useIsFocused();
    const cityStorage = useCity();
    const navigation = useNavigation();
    const emptyTitle = `Parece que você ainda não
    adicionou uma cidade`;
    const emptyText = `Tente adicionar uma cidade usando o botão
    de busca`;

    const fetch = async () => {
        setIsLoading(true);
        const cities = await cityStorage.getAllCity();
        setData(cities);
        setIsLoading(false);
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
                <Heading size="sm" color="white" >
                    Cidades
                </Heading>
                <IconButton icon={<AddIcon />} onPress={() => navigation.navigate("SearchScreen")} />
            </Flex>
            {isLoading ? (<Spinner marginTop={10} />) : (
            <Box background="#FAFAFA" height="100%" pb={"66px"} px={4} pt={4}>
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
                                onFavorite={() => {
                                    setIsLoading(true);
                                    if(item.isFavorite){
                                        cityStorage.removeCityFromFavorite(item.lat,item.lng, () => fetch());
                                    } else {
                                        cityStorage.addCityToFavorite(item.lat,item.lng, () => fetch());
                                    }
                                }}
                                onPressCard={() => navigation.navigate("DetailsScreen", { lat: item.lat, lng: item.lng })}
                            />
                        </Box>
                    )}
                />
            </Box>
            )}
        </>
    );
};
