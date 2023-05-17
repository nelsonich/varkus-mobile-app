import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import publicRoutes from "./routes/public";

const Stack = createNativeStackNavigator();

function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {publicRoutes.map((route, index) => (
                    <Stack.Screen
                        key={`AppRouteItem-public-${index}-${route.pathname}`}
                        name={route.name}
                        component={route.screen}
                        options={({ route }) => ({
                            headerTitle: "Varkus",
                        })}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppRoutes;
