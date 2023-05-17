import React from "react";
import { Alert, HStack, Text, VStack } from "native-base";

function ToastAlert({
    id,
    status,
    variant,
    title,
    message,
    isClosable,
    ...rest
}) {
    return (
        <Alert
            // maxWidth="100%"
            alignSelf="center"
            flexDirection="row"
            status={status ? status : "info"}
            variant={"left-accent"}
            {...rest}
        >
            <VStack space={1} flexShrink={1}>
                <HStack
                    flexShrink={1}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt={1} />
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            flexShrink={1}
                            color={
                                variant === "solid"
                                    ? "lightText"
                                    : variant !== "outline"
                                    ? "darkText"
                                    : null
                            }
                        >
                            {message}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
        </Alert>
    );
}

export default ToastAlert;
