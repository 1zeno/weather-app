import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button } from 'native-base';

export const DetailsScreen = () => {
    const navigation = useNavigation();

    return (
        <Box>
            <Button onPress={() => navigation.navigate('HomeScreen')}>
                Home
            </Button>
        </Box>
    );
};
