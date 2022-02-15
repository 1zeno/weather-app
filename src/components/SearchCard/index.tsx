import React from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
} from "native-base";

interface IProps {
    localization: {
        city: string,
        state: string,
        country: string,
    };
    onAdd: () => void;
}

export const SearchCard: React.FC<IProps> = (props) => {

    const {
        localization,
        onAdd,
    } = props;

    return (
            <Flex
                borderRadius="md"
                bg="#FFFFFF"
                p={4}
                style={{
                    elevation: 4,
                }}
            >
                <Box>
                    <Heading size="sm">{localization.city}</Heading>
                    <Text maxW={150} isTruncated>{localization.state}</Text>
                    <Text>{localization.country}</Text>
                </Box>
                {onAdd && (
                    <Button variant="link" onPress={onAdd}>Adicionar</Button>
                )}
            </Flex>
    )
};