import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Box, Center, VStack, Text, Alert } from "native-base";

function CongratulationsScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Center w="100%">
                <Box safeArea py="3" w="100%" maxW="310">
                    <VStack space={2} mt="1">
                        <Alert w="100%" status="success">
                            <VStack
                                space={1}
                                flexShrink={1}
                                w="100%"
                                alignItems="center"
                            >
                                <Alert.Icon size="md" />
                                <Text
                                    fontSize="md"
                                    fontWeight="medium"
                                    _dark={{
                                        color: "coolGray.800",
                                    }}
                                >
                                    Հաստատված վարկ
                                </Text>

                                <Box
                                    _text={{
                                        textAlign: "center",
                                    }}
                                    _dark={{
                                        _text: {
                                            color: "coolGray.600",
                                        },
                                    }}
                                >
                                    <Text>
                                        Հարգելի {route.params.name} ձեր վարկը
                                        հաջողությամբ հաստատվել է։
                                    </Text>

                                    <Text mt={5}>Հարգանքներով՝ Varkus</Text>
                                </Box>
                            </VStack>
                        </Alert>
                    </VStack>
                </Box>
            </Center>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
    },
});

export default CongratulationsScreen;
