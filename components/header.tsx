import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface HomeHeaderProps {
  name: string;
  position: string;
  avatarUrl?: string;
}

export default function HomeHeader({ name, position, avatarUrl }: HomeHeaderProps) {
  // Fungsi untuk menghasilkan inisial jika tidak ada avatar
  const getInitials = (fullName: string) => {
    if (!fullName) return "";
    return fullName
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.positionText}>{position}</Text>
        </View>

        <View style={styles.avatarContainer}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarText}>{getInitials(name)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#26A69A",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  positionText: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 14,
    marginTop: 2,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  avatarFallback: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
