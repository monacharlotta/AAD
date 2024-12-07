import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import { useAppContext } from '../store/Context';

export default function OverviewScreen({ navigation }: any) {
  const { transactions } = useAppContext();

  // Esimerkki käyttäjän nimi
  const userName = "Mona";

  // Esimerkkidata kokonaistuloille ja -menoille
  const totalIncome = transactions
    .filter((item: { type: string; }) => item.type === 'Tulo')
    .reduce((sum: number, item: { amount: string; }) => sum + parseFloat(item.amount), 0);

  const totalExpense = transactions
    .filter((item: { type: string; }) => item.type === 'Kulu')
    .reduce((sum: number, item: { amount: string; }) => sum + parseFloat(item.amount), 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tervetuloa-teksti käyttäjän nimellä */}
      <Text style={styles.greeting}>Tervetuloa, {userName}!</Text>

      {/* Kaaviokuva */}
      <Image
        source={require("../../assets/images/chart-overview.png")}
        style={styles.chartImage}
      />
      <Text style={styles.sectionTitle}>Yhteenveto</Text>
      <View style={styles.transactionBox}>
        <Text style={styles.summaryIncome}>Tulot: {totalIncome}€</Text>
        <Text style={styles.summaryExpense}>Menot: {totalExpense}€</Text>
        <Text style={styles.summaryBalance}>Balanssi: {totalIncome - totalExpense}€</Text>
      </View>


      {/* Kuvaileva teksti ja laatikko viimeisille tapahtumille */}
      <Text style={styles.sectionTitle}>Viimeisimmät tulot ja menot</Text>
      <View style={styles.transactionBox}>
        { transactions.map((item: { id: React.Key | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <View style={styles.transactionItem} key={item.id}>
          <Text style={styles.transactionText}>
            {item.type}: {item.amount}€ ({item.category})
          </Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
        ))}
      </View>

      {/* Nappi seuraavalle sivulle */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('addExpense')}
      >
        <Text style={styles.addButtonText}>Lisää uusi tapahtuma</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  // Yleinen container-tyyli
  container: {
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

  // Yhteenveto-tyylit
  summaryBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.buttonBackground,
  },
  summaryText: {
    fontSize: 16,
    color: Colors.buttonText,
    marginBottom: 5,
  },
  // Kuvaileva otsikko
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.titleText, // Käytetään vaaleampaa tekstiväriä
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
    color: Colors.bodyText,
  },
  // Lisää-nappi
  addButton: {
    backgroundColor: Colors.buttonBackground,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.buttonText,
    marginBottom: 10,
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  summaryIncome: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  summaryExpense: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
  summaryBalance: {
    fontSize: 16,
    color: Colors.buttonText,
    fontWeight: "bold",
  },
});

