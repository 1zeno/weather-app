import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    Box,
    Flex,
    Heading,
    VStack,
    Text,
    useDisclose,
    IconButton,
} from "native-base";
import SearchIcon from "../../assets/search.svg";
import { SearchModal } from "../../components";

export const HomeScreen = () => {
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const navigation = useNavigation();
    console.log("cheogu na home");
    const emptyTitle = `Parece que você ainda não
    adicionou uma cidade`;
    const emptyText = `Tente adicionar uma cidade usando o botão
    de busca`;
    return (
        <Box background="#FAFAFA" height="100%">
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
            <SearchModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};
