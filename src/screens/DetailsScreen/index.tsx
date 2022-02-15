import React, { useContext } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Box, Button, FlatList, Flex, Heading, IconButton, Spinner, Text } from "native-base";
import { format as dateFormat } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useWeather } from "../../hooks/useWeather";
import { CityCard } from "../../components";
import { format } from "../../resources/format";
import LeftArrowIcon from "../../assets/leftArrow.svg";
import DeleteIcon from "../../assets/deleteWhite.svg";
import { useCity } from "../../hooks/useCity";
import { GlobalContext } from "../../contexts/globalContext";
import { useNavigator } from "../../hooks/useNavigator";
import { Forecast } from "../../types";
import { ForecastCard } from "../../components/ForecastCard";

interface IProps {
    route: {
        params: {
            lat: number,
            lng: number,
        },
    };
}

export const DetailsScreen = (props: IProps) => {
    const { params } = props.route;

    const { isCelsius, changeIsCelsius } = useContext(GlobalContext);
    const navigator = useNavigator();
    const isFocused = useIsFocused();
    const weatherStorage = useWeather();
    const cityStorage = useCity();

    const [data, setData] = React.useState<Forecast[]>([]);
    const [cityName, setCityName] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);

    const fetch = async () => {
        setIsLoading(true);

        const forecast = await weatherStorage.getForecast({lat: params.lat, lng: params.lng});
        await cityStorage.updateCityWeather({lat: params.lat, lng: params.lng});
        const city = await cityStorage.getCity({lat: params.lat, lng: params.lng});

        setCityName(city.city);
        setData(forecast);
        setIsLoading(false);
    }

    const onDelete = async () => {
        setIsLoading(true);

        await cityStorage.deleteCity({lat: params.lat, lng: params.lng}, () => setIsLoading(false));
        navigator.goBack();
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
                alignItems="center"
            >
                <Flex flexGrow={1} flexDirection="row" alignItems="center">
                    <IconButton
                        background="#3AA7F4"
                        icon={<LeftArrowIcon />}
                        onPress={navigator.goBack}
                    />
                    <Heading size="sm" color="white" pl={4}>
                        {"Detalhes"}
                    </Heading>
                </Flex>
                <IconButton
                        background="#3AA7F4"
                        icon={<DeleteIcon />}
                        onPress={onDelete}
                    />
            </Flex>
            {isLoading ? (<Spinner marginTop={10} />) : (
                <Flex background="#FAFAFA" height="100%" pb={"66px"} px={4} pt={4}>
                    <Heading size="md"  py={4}>
                        {cityName}
                    </Heading>
                    <Button
                        mx="auto"
                        w="100%"
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
                            <Text
                                color="#889AAD"
                                textAlign="center"
                            >
                                {"Nenhum resultado encontrado"}
                            </Text>
                        }
                        renderItem={({ item }) => (
                            <Box mb={6}>
                                <ForecastCard
                                    forecast={item}
                                    isCelsius={isCelsius}
                                />
                            </Box>
                        )}
                    />
                </Flex>
            )}
        </>
    );
};
