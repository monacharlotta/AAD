import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Virhe', 'Täytä kaikki kentät.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Virhe', 'Salasanat eivät täsmää.');
      return;
    }

    // Here you could add a registration API call or further logic
    Alert.alert('Onnistui', `Tervetuloa, ${username}!`);
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
                <Text style={styles.buttonText}>Kirjaudu</Text>
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
