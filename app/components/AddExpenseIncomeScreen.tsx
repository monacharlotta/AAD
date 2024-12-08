import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import Colors from "../constants/Colors";
import { Picker } from "@react-native-picker/picker"; // Dropdown-valikko
import DateTimePicker from "@react-native-community/datetimepicker"; // Päivämäärävalitsin
import LoadingButton from "../components/LoadingButton"; // Tuodaan LoadingButton
import { useAppContext } from "../store/Context";

export default function AddExpenseIncomeScreen({ navigation }: any) {
    const [isIncome, setIsIncome] = useState(false); // Switchin tila, oletuksena meno
    const categories = isIncome
        ? ["Palkka", "Lahja", "Tuki", "Muu"]
        : ["Asuminen", "Ruoka", "Liikenne", "Viihde", "Muu"];

    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(categories[0]); // Oletuskategoria
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false); // Latausanimaation tila

    const { addTransaction } = useAppContext();

    const addTransactionPressed = async () => {
        setLoading(true);
        try {
            addTransaction(isIncome, amount, date, category);

            // Reset local state
            setIsIncome(false);
            setDate(new Date());
            setAmount("");
            setCategory(categories[0]);
            setShowDatePicker(false);

            navigation.navigate("overview");
        } finally {
            setLoading(false); // Lopeta latausanimaatio
        }
    };

    return (
        <View style={styles.container}>
            {/* Otsikko */}
            <Text style={styles.title}>Lisää {isIncome ? "Tulo" : "Meno"}</Text>

            {/* Switch nappula tulo/meno valintaan */}
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Meno</Text>
                <Switch
                    value={isIncome}
                    onValueChange={() => setIsIncome((prev) => !prev)}
                    trackColor={{ false: Colors.buttonBackground, true: "lightblue" }}
                    thumbColor={isIncome ? Colors.primaryBackground : Colors.buttonText}
                />
                <Text style={styles.switchLabel}>Tulo</Text>
            </View>

            {/* Päivämäärävalitsin */}
            <View style={styles.datePicker}>
                <Text
                    style={styles.datePickerText}
                    onPress={() => setShowDatePicker(true)}
                >
                    {date.toLocaleDateString("fi-FI")}
                </Text>
            </View>

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
                placeholder="Syötä summa (€)"
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
            <LoadingButton
                onPress={addTransactionPressed}
                loading={loading}
                buttonText={`Lisää ${isIncome ? "Tulo" : "Meno"}`}
                buttonStyle={styles.addButton}
                textStyle={styles.addButtonText}
            />
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
    switchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
        color: Colors.buttonText,
        marginHorizontal: 10,
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

