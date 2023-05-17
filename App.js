import React from "react";
import { NativeBaseProvider } from "native-base";
import AppRoutes from "./src/routes/AppRoutes";

export default function App() {
    return (
        <NativeBaseProvider>
            <AppRoutes />
        </NativeBaseProvider>
    );
}
