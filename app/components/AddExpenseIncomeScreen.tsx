import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import { Picker } from "@react-native-picker/picker"; // Dropdown-valikko
import DateTimePicker from "@react-native-community/datetimepicker"; // Päivämäärävalitsin

export default function AddExpenseIncomeScreen({ navigation }) {
  const [type, setType] = useState("expense"); // "expense" tai "income"
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("housing"); // Oletuskategoria
  const [showDatePicker, setShowDatePicker] = useState(false);

  const categories = type === "expense"
    ? ["Housing", "Food", "Transportation", "Entertainment", "Other"]
    : ["Salary", "Gift", "Support", "Other"];

  const handleAdd = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Error", "Please enter a valid amount.");
      return;
    }

    const newEntry = {
      type,
      date,
      amount: parseFloat(amount),
      category,
    };

    // Simuloi tietojen tallentamista (voisi lähettää API:lle tai Redux-storeen)
    console.log("New Entry:", newEntry);
    Alert.alert("Success", `${type === "expense" ? "Expense" : "Income"} added!`);

    // Siirry takaisin overview-sivulle
    navigation.navigate("overview", { newEntry });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add {type === "expense" ? "Expense" : "Income"}</Text>

      {/* Napit tyypin valintaan */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "expense" && styles.activeButton,
          ]}
          onPress={() => setType("expense")}
        >
          <Text style={styles.typeButtonText}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "income" && styles.activeButton,
          ]}
          onPress={() => setType("income")}
        >
          <Text style={styles.typeButtonText}>Income</Text>
        </TouchableOpacity>
      </View>

      {/* Päivämäärävalitsin */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.datePickerText}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* Summakenttä */}
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Kategoriavalikko */}
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((cat, index) => (
          <Picker.Item label={cat} value={cat.toLowerCase()} key={index} />
        ))}
      </Picker>

      {/* Lisää-nappi */}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add {type === "expense" ? "Expense" : "Income"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  typeButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: Colors.buttonBackground,
  },
  activeButton: {
    backgroundColor: "lightblue",
  },
  typeButtonText: {
    color: Colors.buttonText,
  },
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  datePickerText: {
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: Colors.buttonBackground,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
  },
});
