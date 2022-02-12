import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens/HomeScreen";
import { DetailsScreen } from "./src/screens/DetailsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#3AA7F4",
            }}
        >
            <NativeBaseProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName="HomeScreen"
                    >
                        <Stack.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                        />
                        <Stack.Screen
                            name="DetailsScreen"
                            component={DetailsScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </SafeAreaView>
    );
}

export default App;
