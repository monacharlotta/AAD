import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";

export default function LoginScreen() {
    // Tilanmuuttujat käyttäjänimen ja salasanan tallentamiseen
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Funktio, joka käsittelee kirjautumisen
    const handleLogin = () => {
        // Tarkistetaan, että kentät eivät ole tyhjiä
        if (username === "" || password === "") {
            Alert.alert("Virhe", "Täytä kaikki kentät!");
            return;
        }

        // Simuloidaan kirjautumista (voit lisätä API-kutsun tähän)
        if (username === "testi" && password === "salasana") {
            Alert.alert("Onnistui", "Kirjautuminen onnistui!");
            // Navigoi etusivulle (lisää navigointi myöhemmin)
        } else {
            Alert.alert("Virhe", "Väärä käyttäjätunnus tai salasana.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Otsikko */}
            <Text style={styles.title}>Kirjaudu sisään</Text>

            {/* Käyttäjänimen syöttökenttä */}
            <TextInput
                style={styles.input}
                placeholder="Käyttäjätunnus"
                value={username}
                onChangeText={(text) => setUsername(text)} // Päivittää käyttäjänimen
            />

            {/* Salasanan syöttökenttä */}
            <TextInput
                style={styles.input}
                placeholder="Salasana"
                secureTextEntry // Peittää salasanan näytöllä
                value={password}
                onChangeText={(text) => setPassword(text)} // Päivittää salasanan
            />

            {/* Kirjautumisnappi */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Kirjaudu</Text>
            </TouchableOpacity>
        </View>
    );
}

// Tyylit kirjautumissivulle
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Keskittää pystysuunnassa
        alignItems: "center", // Keskittää vaakasuunnassa
        padding: 20,
        backgroundColor: Colors.primaryBackground, // Vaalea taustaväri
    },
    title: {
        fontSize: 24, // Suurempi fontti otsikolle
        fontWeight: "bold",
        marginBottom: 20, // Väli otsikon ja muiden elementtien välillä
    },
    input: {
        width: "80%", // Tekstikentän leveys
        height: 40, // Tekstikentän korkeus
        borderColor: "#ccc", // Harmaa reunus
        borderWidth: 1, // Reunuksen paksuus
        borderRadius: 5, // Pyöristetyt reunat
        paddingHorizontal: 10, // Sisennys tekstikentässä
        marginBottom: 15, // Väli tekstikenttien välillä
        backgroundColor: "white", // Valkoinen tausta
    },
    button: {
        backgroundColor: Colors.buttonBackground, //napin väri
        padding: 10, // Sisennys
        borderRadius: 5, // Pyöristetyt reunat
        alignItems: "center", // Keskittää tekstin vaakasuunnassa
    },
    buttonText: {
        color: Colors.buttonText //tekstin väri

    }
});
