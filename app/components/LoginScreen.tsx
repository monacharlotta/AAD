import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import Colors from "../constants/Colors";

//lisätty API-avain tähän (varmaan fiksumpaa ettei ole tässä)
const FIREBASE_API_KEY = "AIzaSyBOO0inMN8kSU8X53oap19D1R2b8sDwEIk";


export default function LoginScreen({ navigation }) {
    // Tilanmuuttujat s-postin ja salasanan tallentamiseen
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // Funktio, joka käsittelee kirjautumisen
    const handleLogin = async () => {
        // Tarkistetaan, että kentät eivät ole tyhjiä
        if (email === "" || password === "") {
            Alert.alert("Virhe", "Täytä kaikki kentät!");
            return;
        }

        // Firebase API-kutsu kirjautumista varten
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            );
            Alert.alert("Onnistui", "Kirjautuminen onnistui!");
            navigation.navigate("overviewDrawer");
        } catch (error) {
            Alert.alert("Virhe", "Väärä sähköposti tai salasana.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Otsikko */}
            <Text style={styles.title}>Kirjaudu sisään</Text>

            {/* S-postin syöttökenttä */}
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Sähköposti"
                value={email}
                onChangeText={(text) => setEmail(text)} // Päivittää s-postin
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
