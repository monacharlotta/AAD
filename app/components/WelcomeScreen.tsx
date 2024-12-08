import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors"; // Tuo väriasetukset
import LoadingButton from "../components/LoadingButton"; // Tuo LoadingButton-komponentti
import { NativeStackScreenProps } from "@react-navigation/native-stack"; // Tyyppimäärittely navigaatiolle

// Navigaatioreitit
type RootStackParamList = {
    login: undefined;
    register: undefined;
};

// Props-tyyppi WelcomeScreenille
type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, "login">;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
    const [loadingLogin, setLoadingLogin] = useState(false); // Latausanimaatio login-painikkeelle
    const [loadingRegister, setLoadingRegister] = useState(false); // Latausanimaatio register-painikkeelle

    const handleNavigateLogin = async () => {
        setLoadingLogin(true);
        try {
            navigation.navigate("login");
        } finally {
            setLoadingLogin(false);
        }
    };

    const handleNavigateRegister = async () => {
        setLoadingRegister(true);
        try {
            navigation.navigate("register");
        } finally {
            setLoadingRegister(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/welcome-image.png")}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Tervetuloa Budjetti planneriin!</Text>
            <Text style={styles.description}>
                Tämä sovellus auttaa sinua hallitsemaan kuluja ja tuloja helposti.
                Voit lisätä kulut ja tulot, tarkastella yhteenvetoa ja paljon muuta.
            </Text>

            {/* Login-painike */}
            <LoadingButton
                onPress={handleNavigateLogin}
                loading={loadingLogin}
                buttonText="Kirjaudu sisään"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            {/* Register-painike */}
            <LoadingButton
                onPress={handleNavigateRegister}
                loading={loadingRegister}
                buttonText="Luo käyttäjätunnus"
                buttonStyle={[styles.button, styles.secondaryButton]}
                textStyle={[styles.buttonText, styles.secondaryButtonText]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: Colors.primaryBackground,
    },
    image: {
        width: "80%",
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.titleText,
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: Colors.bodyText,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.buttonBackground,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center",
        width: "80%",
    },
    buttonText: {
        color: Colors.buttonText,
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButton: {
        backgroundColor: Colors.secondaryBackground,
        borderWidth: 1,
        borderColor: Colors.buttonBackground,
    },
    secondaryButtonText: {
        color: Colors.buttonBackground,
    },
});
