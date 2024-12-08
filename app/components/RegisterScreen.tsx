import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import axios from "axios";
import Colors from '../constants/Colors';
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import LoadingButton from '../components/LoadingButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Siirrä FIREBASE_API_KEY ympäristömuuttujaksi pitkässä juoksussa
const FIREBASE_API_KEY = "AIzaSyBOO0inMN8kSU8X53oap19D1R2b8sDwEIk";

// Navigaation reitit
type RootStackParamList = {
    Register: undefined;
    login: undefined;
};

// Navigaation props-tyyppi
type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Rekisteröintitoiminto
    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Virhe', 'Täytä kaikki kentät.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Virhe', 'Salasanat eivät täsmää.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            );

            const { localId } = response.data;

            await setDoc(doc(db, "users", localId), {
                username,
                email,
            });

            Alert.alert("Onnistui", `Tervetuloa, ${username}!`);
            navigation.navigate("login");
        } catch (error) {
            console.error("Registration error:", error);

            if (error.response) {
                const errorCode = error.response.data.error.message;
                switch (errorCode) {
                    case "EMAIL_EXISTS":
                        Alert.alert("Virhe", "Sähköposti on jo käytössä.");
                        break;
                    case "OPERATION_NOT_ALLOWED":
                        Alert.alert("Virhe", "Salasanakirjautuminen ei ole käytössä.");
                        break;
                    case "TOO_MANY_ATTEMPTS_TRY_LATER":
                        Alert.alert("Virhe", "Liian monta epäonnistunutta yritystä. Yritä myöhemmin uudelleen.");
                        break;
                    default:
                        Alert.alert("Virhe", `Rekisteröinti epäonnistui: ${errorCode}`);
                }
            } else {
                Alert.alert("Virhe", "Verkkovirhe. Tarkista internet-yhteytesi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Luo käyttäjätunnus</Text>

            <TextInput
                style={styles.input}
                placeholder="Käyttäjätunnus"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Sähköposti"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TextInput
                style={styles.input}
                placeholder="Salasana"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                placeholder="Vahvista salasana"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />

            <LoadingButton
                onPress={handleRegister}
                loading={loading}
                buttonText="Rekisteröidy"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryBackground,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.buttonText,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.buttonBackground,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: Colors.buttonBackground,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: Colors.buttonText,
        fontWeight: 'bold',
    },
});
