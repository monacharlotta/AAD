import React from "react";
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";

interface LoadingButtonProps {
    onPress: () => void; // Funktio, joka suoritetaan napin painalluksesta
    loading: boolean; // Latausanimaation tila
    buttonText: string; // Napissa näytettävä teksti
    buttonStyle?: StyleProp<ViewStyle>; // Valinnaiset tyylit napille
    textStyle?: StyleProp<TextStyle>; // Valinnaiset tyylit tekstille
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    onPress,
    loading,
    buttonText,
    buttonStyle,
    textStyle,
}) => {
    return (
        <TouchableOpacity
            onPress={!loading ? onPress : undefined} // Estetään painallus, jos lataus on käynnissä
            style={[styles.button, buttonStyle, loading && styles.disabledButton]} // Oletustyyli ja mahdollinen lisätyyli
            disabled={loading} // Estetään painallus latauksen aikana
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={[styles.text, textStyle]}>{buttonText}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#6200EE",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    disabledButton: {
        opacity: 0.7,
    },
});

export default LoadingButton;
