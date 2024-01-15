import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import { LinearGradient } from "expo-linear-gradient";

// Sample data for useful features
const usefulFeatureData = [
  "Weather Forecast",
  "News Updates",
  "To-Do List",
  "Stock Market Updates",
  "Traffic Alerts",
  // Add more useful features here
];

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [name, setName] = useState("");
  const [showUsefulFeatureModal, setShowUsefulFeatureModal] = useState(false);

  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  const openUsefulFeatureModal = () => {
    // Open the modal to display the useful features
    setShowUsefulFeatureModal(true);
  };

  return (
    <LinearGradient colors={["#FF6B6B", "#6BFF6B"]} style={styles.container}>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Text style={styles.greeting}>
        {name ? `Hi, ${name}!` : "Enter your name above"}
      </Text>
      <Button title="Useful Features" onPress={openUsefulFeatureModal} />
      <StatusBar style="auto" />

      {/* Modal to display useful features */}
      <Modal
        visible={showUsefulFeatureModal}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Useful Features</Text>
          <ScrollView>
            {usefulFeatureData.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.usefulFeatureItem}
                onPress={() => {
                  // Implement action for each feature here
                  // For example, open a link or perform a specific action
                  // You can customize this based on your needs
                }}
              >
                <Text style={styles.usefulFeatureText}>{feature}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button
            title="Close"
            onPress={() => setShowUsefulFeatureModal(false)}
          />
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  usefulFeatureItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  usefulFeatureText: {
    fontSize: 16,
  },
});
