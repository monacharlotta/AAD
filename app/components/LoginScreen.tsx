import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { signInWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Colors from "../constants/Colors";
import LoadingButton from "../components/LoadingButton";

// Lisätty API-avain tähän (suositeltavaa siirtää ympäristömuuttujaksi)
const FIREBASE_API_KEY = "AIzaSyBOO0inMN8kSU8X53oap19D1R2b8sDwEIk";

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); // Tila latausanimaatiolle

    const handleLogin = async () => {
        if (email === "" || password === "") {
            Alert.alert("Virhe", "Täytä kaikki kentät!");
            return;
        }

        setLoading(true); // Näytä latausanimaatio
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            );

            const { email: userEmail } = response.data; // Hae käyttäjän sähköposti
            const credential = EmailAuthProvider.credential(userEmail, password);
            await signInWithCredential(auth, credential);

            Alert.alert("Onnistui", "Kirjautuminen onnistui!");
            navigation.navigate("overviewDrawer");
        } catch (error) {
            console.error("Login error:", error); // Virheen lokitus
            Alert.alert("Virhe", "Väärä sähköposti tai salasana.");
        } finally {
            setLoading(false); // Piilota latausanimaatio
        }
    };

    return (
        <View style={styles.container}>
            {/* Otsikko */}
            <Text style={styles.title}>Kirjaudu sisään</Text>

            {/* Sähköpostin syöttökenttä */}
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Sähköposti"
                value={email}
                onChangeText={(text) => setEmail(text)} // Päivittää sähköpostin
            />

            {/* Salasanan syöttökenttä */}
            <TextInput
                style={styles.input}
                placeholder="Salasana"
                secureTextEntry // Peittää salasanan näytöllä
                value={password}
                onChangeText={(text) => setPassword(text)} // Päivittää salasanan
            />

            {/* Kirjautumisnappi tai latausanimaatio */}
            <LoadingButton
                onPress={handleLogin}
                loading={loading}
                buttonText="Kirjaudu"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
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
        backgroundColor: Colors.primaryBackground, // Taustaväri
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
        backgroundColor: Colors.buttonBackground, // Napin väri
        padding: 10, // Sisennys
        borderRadius: 5, // Pyöristetyt reunat
        alignItems: "center", // Keskittää tekstin vaakasuunnassa
    },
    buttonText: {
        color: Colors.buttonText, // Tekstin väri
        fontWeight: "bold",
    },
});
