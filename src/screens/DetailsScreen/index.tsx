import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Box, FlatList, Flex, Heading, IconButton, Spinner, Text } from "native-base";
import { format as dateFormat } from "date-fns"
import { ptBR } from "date-fns/locale"
import { IForecast, useWeather } from "../../hooks/useWeather";
import { CityCard } from "../../components";
import { format } from "../../resources/format";
import LeftArrowIcon from "../../assets/leftArrow.svg";
import { useCity } from "../../hooks/useCity";

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
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const weatherStorage = useWeather();
    const cityStorage = useCity();
    const [data, setData] = React.useState<IForecast[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetch = async () => {
        setIsLoading(true);
        const forecast = await weatherStorage.getForecast(params.lat, params.lng);
        await cityStorage.updateCityWeather(params.lat, params.lng);
        setData(forecast);
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
                alignItems="center"
            >
                <IconButton
                    background="#3AA7F4"
                    icon={<LeftArrowIcon />}
                    onPress={navigation.goBack}
                />
                <Heading size="sm" color="white" pl={4}>
                    Detalhes
                </Heading>
            </Flex>
            {isLoading ? (<Spinner marginTop={10} />) : (
                <Box background="#FAFAFA" height="100%" pb={"66px"} px={4} pt={4}>
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
                                <CityCard
                                    localization={{
                                        city: format.initialUpperCase(dateFormat(item.date, "eee", { locale: ptBR })),
                                        state: dateFormat(item.date, "d MMMM", { locale: ptBR }),
                                        country: "",
                                        lat: 0,
                                        lng: 0,
                                    }}
                                    maxTemp={item.maxTemp}
                                    minTemp={item.minTemp}
                                    currentTemp={item.currentTemp}
                                    weatherDescription={item.weatherDescription}
                                />
                            </Box>
                        )}
                    />
                </Box>
            )}
        </>
    );
};
