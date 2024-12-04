import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import Colors from '../constants/Colors';

export default function OverviewScreen({ navigation }: any) {
  // Esimerkki käyttäjän nimi
  const userName = "Mona";

  // Esimerkki viimeisimmistä tapahtumista
  const recentTransactions = [
    { id: '1', type: 'Tulo', amount: '500€', date: '01.12.2024' },
    { id: '2', type: 'Kulu', amount: '150€', date: '30.11.2024' },
    { id: '3', type: 'Tulo', amount: '300€', date: '29.11.2024' },
  ];

  return (
    <View style={styles.container}>
      {/* Tervetuloa-teksti käyttäjän nimellä */}
      <Text style={styles.greeting}>Tervetuloa, {userName}!</Text>
      <Image
         source={require("../assets/images/chart-overview.png")}
        style={styles.image}
        resizeMode="contain"

      {/* Kuvaileva teksti ja laatikko viimeisille tapahtumille */}
      <Text style={styles.sectionTitle}>Viimeisimmät tulot ja kulut</Text>
      <View style={styles.transactionBox}>
        <FlatList
          data={recentTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                {item.type}: {item.amount}
              </Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      {/* Nappi seuraavalle sivulle */}
      <Button
        title="Lisää uusi tapahtuma"
        onPress={() => navigation.navigate('AddExpense')}
        color={Colors.buttonBackground}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Yleinen container-tyyli
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground, // Taustaväri määritelty Colorsissa
    padding: 20,
  },
  // Tervetuloa-teksti
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.buttonText, // Tekstin väri Colorsissa
    textAlign: 'center',
    marginBottom: 20,
  },
  // Kaaviokuva
  chartImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain', // Sovitetaan kuva säilyttäen mittasuhteet
    marginBottom: 20,
  },
  // Kuvaileva otsikko
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondaryBackground, // Käytetään vaaleampaa tekstiväriä
    marginBottom: 10,
  },
  // Laatikkotyylit
  transactionBox: {
    borderWidth: 1,
    borderColor: Colors.buttonBackground, // Siniset reunat
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  // Yksittäinen tapahtuma laatikossa
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  transactionText: {
    fontSize: 16,
    color: Colors.buttonText,
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.secondaryBackground,
  },
});
