import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import { ChevronRight, Clock } from "lucide-react-native";
import HomeHeader from "../components/header";

interface Task {
  id: string;
  name: string;
  time: string;
  status: "ongoing" | "completed" | "pending";
  locations: string[]; // keep strings, we'll map to area objects on navigate
}

interface Area {
  id: string;
  name: string;
  description: string;
}

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    return `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const todayTasks: Task[] = [
    {
      id: "1",
      name: "Patroli Satu",
      time: "08:00 - 10:00",
      status: "completed",
      locations: ["Pintu Masuk Utara", "Area Parkir A", "Gedung Utama Lt.1"],
    },
    {
      id: "2",
      name: "Patroli Dua",
      time: "10:00 - 12:00",
      status: "ongoing",
      locations: ["Area Parkir B", "Gedung Utama Lt.2", "Kantin"],
    },
    {
      id: "3",
      name: "Patroli Tiga",
      time: "14:00 - 16:00",
      status: "pending",
      locations: ["Gudang", "Area Loading", "Pintu Masuk Selatan"],
    },
  ];

  const getStatusColor = (status: "ongoing" | "completed" | "pending") => {
    switch (status) {
      case "ongoing":
        return "#26A69A";
      case "completed":
        return "#7CB342";
      default:
        return "#9E9E9E";
    }
  };

  // map location strings -> Area objects (simple descriptions; adjust as needed)
  const mapLocationsToAreas = (locations: string[]): Area[] =>
    locations.map((loc, idx) => ({
      id: `${idx}-${loc}`,
      name: loc,
      description:
        loc === "Pintu Masuk Utara"
          ? "Area Lantai 1 - Dekat KFC Mall"
          : loc === "Area Parkir A"
          ? "Parkir sebelah utara"
          : loc === "Gedung Utama Lt.1"
          ? "Gedung utama lantai 1"
          : `Deskripsi untuk ${loc}`,
    }));

  const renderTaskCard: ListRenderItem<Task> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        const areasForTask = mapLocationsToAreas(item.locations);
        navigation.navigate("ListAP", {
          areas: areasForTask,
          title: item.name,
        });
      }}
      style={styles.taskContainer}
    >
      <View
        style={[
          styles.statusBar,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      />

      <View style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>{item.name}</Text>
            <View style={styles.taskTimeContainer}>
              <Clock size={14} color="black" />
              <Text style={styles.taskTimeText}>{item.time}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <ChevronRight size={22} color="black" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAreaItem: ListRenderItem<Area> = ({ item }) => (
    <View style={styles.areaContainer}>
      <View style={styles.areaContent}>
        <Text style={styles.areaName}>{item.name}</Text>
        <Text style={styles.areaDescription}>{item.description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <ChevronRight size={18} color="black" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeHeader name="Budi Santoso" position="Security Guard" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.timeCard}>
            <View style={styles.dateRow}>
              <View style={styles.dateLine} />
              <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
            </View>

            <Text style={styles.clockText}>{formatTime(currentTime)}</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log("Lihat Semua Task")}
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>Lihat Semua Task</Text>
              <ChevronRight size={18} color="#26A69A" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Task Hari Ini</Text>
          </View>

          <FlatList
            data={todayTasks}
            renderItem={renderTaskCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("Lihat Semua Task (bawah)")}
            style={styles.bottomSeeAllButton}
          >
            <Text style={styles.bottomSeeAllText}>Lihat Semua Task</Text>
            <ChevronRight size={18} color="#FFF" />
          </TouchableOpacity>

          <View style={[styles.sectionHeader, { marginTop: 16 }]}>
            <Text style={styles.sectionTitle}>List Area</Text>
            <Text style={{ color: "#26A69A" }}>Lihat Semua</Text>
          </View>

          <FlatList
            data={mapLocationsToAreas([
              "Access Point 1",
              "Access Point 2",
              "Access Point 3",
            ])}
            renderItem={renderAreaItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timeCard: {
    backgroundColor: "#26A69A",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dateLine: {
    width: 4,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginRight: 6,
  },
  dateText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
  },
  clockText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#26A69A",
    marginRight: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusBar: {
    width: 4,
    height: 56,
    borderRadius: 4,
    marginRight: 10,
  },
  taskCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  taskTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  taskTimeText: {
    fontSize: 12,
    color: "#000",
    marginLeft: 4,
  },
  iconContainer: {
    backgroundColor: "#E5E7EB",
    borderRadius: 50,
    padding: 6,
  },

  /* Bottom "Lihat Semua Task" button */
  bottomSeeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#26A69A",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  bottomSeeAllText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },

  /* Area list styles */
  areaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  areaContent: {
    flex: 1,
  },
  areaName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  areaDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});
