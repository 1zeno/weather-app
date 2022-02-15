import React, { useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
    Box,
    Flex,
    Heading,
    VStack,
    Text,
    IconButton,
    FlatList,
    Spinner,
    Button,
} from "native-base";
import AddIcon from "../../assets/add.svg";
import { CityCard } from "../../components";
import { useCity } from "../../hooks/useCity";
import { GlobalContext } from "../../contexts/globalContext";
import { useNavigator } from "../../hooks/useNavigator";
import { City } from "../../types";

export const HomeScreen = () => {
    const { isCelsius, changeIsCelsius } = useContext(GlobalContext);

    const [data, setData] = React.useState<City[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isFetchLoading, setIsFetchLoading] = React.useState(true);
    const isFocused = useIsFocused();
    const cityStorage = useCity();
    const navigator = useNavigator();
    const emptyTitle = `Parece que você ainda não
    adicionou uma cidade`;
    const emptyText = `Tente adicionar uma cidade usando o botão
    de busca`;

    const fetch = async () => {
        setIsFetchLoading(true);
    
        const cities = await cityStorage.getAllCity(()=>setIsFetchLoading(false));
        setData(cities);

        setIsFetchLoading(false);
    }

    const onRefresh = async (lat: number, lng: number) => {
        setIsLoading(true);

        await cityStorage.updateCityWeather({lat, lng});
        await fetch();

        setIsLoading(false);
    }

    const onDelete = async (lat: number, lng: number) => {
        setIsLoading(true);

        await cityStorage.deleteCity({lat, lng});
        await fetch();

        setIsLoading(false);
    }

    const onFavorite = async (isFavorite: boolean, identity: { lat: number, lng: number }) => {
        setIsLoading(true);

        if(isFavorite){
            await cityStorage.removeCityFromFavorite(identity, () => fetch());
        } else {
            await cityStorage.addCityToFavorite(identity, () => fetch());
        }

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
                    {"Cidades"}
                </Heading>
                <IconButton icon={<AddIcon />} onPress={() => navigator.push("SearchScreen")} />
            </Flex>
            {isLoading || isFetchLoading ? (<Spinner marginTop={10} />) : (
                <Flex background="#FAFAFA" height="100%" pb={"66px"} px={4} pt={4}>
                    <Button
                        w="100%"
                        mx="auto"
                        mb={4}
                        background="#3AA7F4"
                        maxWidth={200}
                        onPress={changeIsCelsius}
                    >
                        {isCelsius ? "Trocar para Fahrenheit (ºF)" : "Trocar para Celsius (ºC)"}
                    </Button>
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
                                    city={item}
                                    isCelsius={isCelsius}
                                    onFavorite={() => onFavorite(item.isFavorite, { lat: item.lat, lng: item.lng})}
                                    onDelete={() => onDelete(item.lat, item.lng)}
                                    onRefresh={() => onRefresh(item.lat, item.lng)}
                                    onPressCard={() => navigator.push("DetailsScreen", { lat: item.lat, lng: item.lng })}
                                />
                            </Box>
                        )}
                    />
                </Flex>
            )}
        </>
    );
};
