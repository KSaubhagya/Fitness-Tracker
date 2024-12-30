import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useClickCount } from "./_layout"; // useClickCount hook

//  dt interface
interface Exercise {
  id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  instructions: string;
  image: any; 
}

const HomePage = () => {
  const { username } = useLocalSearchParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [clickedExercises, setClickedExercises] = useState<Exercise[]>([]);
  const [showTable, setShowTable] = useState(false); //  table 
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null); //  details
  const navigation = useNavigation();

  const { count, incrementCount } = useClickCount(); // Count

  // Fetch dt from API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/exercises?muscle=chest", {
          headers: { "X-Api-Key": "bwWHBIJA69xpHDF+tTybiw==kX0f0sZNhlfDxsO1" },
        });
        const data = await response.json();

        const images = [
          require("../assets/images/girl 3.avif"),
          require("../assets/images/v2.jpg"),
          require("../assets/images/v3.avif"),
          require("../assets/images/v4.avif"),
          require("../assets/images/girrl 1.avif"),
          require("../assets/images/v1.jpg"),
          require("../assets/images/man 1.avif"),
        ];

        const formattedExercises = data.map((exercise: any, index: number) => ({
          id: exercise.id || exercise.name, // Use name as fallback ID
          name: exercise.name,
          type: exercise.type,
          muscle: exercise.muscle,
          equipment: exercise.equipment || "None",
          instructions: exercise.instructions || "No instructions provided.",
          image: images[index % images.length], // Dynamic images
        }));

        setExercises(formattedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  
  useEffect(() => {
    if (username) {
      navigation.setOptions({
        headerTitle: `Welcome, ${username}!`,
      });
    }
  }, [navigation, username]);

  //  "Add to list" button
  const handleAddToList = (exercise: Exercise) => {
    setClickedExercises((prevClicked) => [...prevClicked, exercise]);
    incrementCount(); // Increment the count 
  };

  
  const handleImageClick = (exercise: Exercise) => {
    setSelectedExercise(exercise); // Set the clicked exercise as selected
  };

  //  exercise card
  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleImageClick(item)}>
        <Image
          source={typeof item.image === "string" ? { uri: item.image } : item.image}
          style={styles.exerciseImage}
        />
      </TouchableOpacity>
      <Text style={styles.exerciseTitle}>{item.name}</Text>
      <Text style={styles.infoText}>Type: {item.type}</Text>
      <Text style={styles.infoText}>Muscle: {item.muscle}</Text>
      <Text style={styles.infoText}>Equipment: {item.equipment}</Text>
      <TouchableOpacity style={styles.viewButton} onPress={() => handleAddToList(item)}>
        <Text style={styles.viewButtonText}>Add to list</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
     
      <Text style={styles.welcomeText}>Start TODAY with Us!</Text>

      <FlatList
        data={exercises}
        renderItem={renderExerciseCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowTable(!showTable)} // table visibility
      >
        <Text style={styles.floatingButtonText}>{count} Tasks</Text>
      </TouchableOpacity>

      {/* Modal for Table of Clicked Exercises */}
      <Modal visible={showTable} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>Tasks To Do</Text>
            <FlatList
              data={clickedExercises}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTable(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Exercise Details */}
      {selectedExercise && (
        <Modal visible={!!selectedExercise} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.detailContainer}>
              
              <TouchableOpacity onPress={() => setSelectedExercise(null)} style={styles.closeModalButton}>
                <Text style={styles.closeModalButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.detailTitle}>{selectedExercise.name}</Text>
              <Text style={styles.detailText}>Type: {selectedExercise.type}</Text>
              <Text style={styles.detailText}>Muscle: {selectedExercise.muscle}</Text>
              <Text style={styles.detailText}>Equipment: {selectedExercise.equipment}</Text>
              <Text style={styles.detailText}>Instructions: {selectedExercise.instructions}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "100%",
    maxWidth: 350,
    marginHorizontal: "auto",
  },
  exerciseImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  viewButton: {
    backgroundColor: "#39ac39",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#39ac39",
    padding: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  tableContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    maxHeight: "80%",
    overflow: "scroll",
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableCell: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#39ac39",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeModalButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ff0000",
    borderRadius: 20,
    padding: 10,
  },
  closeModalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
});

export default HomePage;
