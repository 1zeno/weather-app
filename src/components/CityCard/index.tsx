import React from "react";
import { Box, Button, Flex, Heading, Text } from "native-base";
import { Pressable } from "react-native";

interface IProps {
    city: string;
    state: string;
    country: string;
    onAdd?: () => void;
    onPressCard?: () => void;
}

export const CityCard: React.FC<IProps> = (props) => {

    const { city, state, country, onAdd, onPressCard } = props;

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
                <Box>
                    <Heading size="sm">{city}</Heading>
                    <Text>{state}</Text>
                    <Text>{country}</Text>
                </Box>
                {onAdd && (
                    <Button variant="link" onPress={onAdd}>Adicionar</Button>
                )}
            </Flex>
        </Pressable>
    )
};