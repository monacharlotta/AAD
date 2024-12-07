import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from "axios";
import Colors from '../constants/Colors';

//lisätty API-avain tähän (varmaan fiksumpaa ettei ole tässä)
const FIREBASE_API_KEY = "AIzaSyBOO0inMN8kSU8X53oap19D1R2b8sDwEIk";

export default function RegisterScreen({ navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Virhe', 'Täytä kaikki kentät.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Virhe', 'Salasanat eivät täsmää.');
      return;
    }

    try {
      const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
          {
              email: email,
              password: password,
              returnSecureToken: true,
          }
      );
      Alert.alert("Onnistui", `Tervetuloa, ${username}!`);
      navigation.navigate("login");
  } catch (error) {
      Alert.alert("Virhe", "Rekisteröinti epäonnistui.");
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luo käyttäjätunnus</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Käyttäjätunnus"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Vahvista salasana"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Rekisteröidy</Text>
            </TouchableOpacity>
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
    backgroundColor: Colors.buttonBackground, //napin väri
    padding: 10, // Sisennys
    borderRadius: 5, // Pyöristetyt reunat
    alignItems: "center", // Keskittää tekstin vaakasuunnassa
},
buttonText: {
    color: Colors.buttonText //tekstin väri

}
});
