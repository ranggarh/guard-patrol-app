import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react-native";

interface HeaderTabProps {
  title: string;
  withBack?: boolean;
  onBack?: () => void;
}

export default function HeaderTab({ title, withBack = false, onBack }: HeaderTabProps) {
  return (
    <View style={styles.container}>
      {withBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {/* Spacer for symmetry */}
      {withBack && <View style={styles.backBtn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});