import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors"; // Tuo väriasetukset

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        // source={require("../assets/images/welcome-image.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Tervetuloa Budjetti planneriin!</Text>
      <Text style={styles.description}>
        Tämä sovellus auttaa sinua hallitsemaan kuluja ja tuloja helposti.
        Voit lisätä kulut ja tulot, tarkastella yhteenvetoa ja paljon muuta.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.buttonText}>Kirjaudu sisään</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("register")}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Luo käyttäjätunnus
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.primaryBackground, // Käytetään pinkkiä taustavärinä
  },
  image: {
    width: "80%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.titleText, // Otsikon väri (tummansininen)
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.bodyText, // Kuvauksen väri (harmaa)
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.buttonBackground, // Napin taustaväri (vaaleansininen)
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8, // Pyöristetyt reunat
    marginBottom: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: Colors.buttonText, // Napin tekstiväri (musta)
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: Colors.secondaryBackground, // Napin taustaväri (valkoinen)
    borderWidth: 1,
    borderColor: Colors.buttonBackground, // Vaaleansininen reuna
  },
  secondaryButtonText: {
    color: Colors.buttonBackground, // Tekstin väri (vaaleansininen)
  },
});
