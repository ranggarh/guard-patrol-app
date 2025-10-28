import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  AlertTriangle,
  CheckCircle,
  Camera,
  Send,
  Siren,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import HeaderTab from "../components/header-tab";

export default function DetailPatrolScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [inRadius, setInRadius] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [report, setReport] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const { area } = route.params || { area: { name: "-", description: "-" } };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const radiusTimer = setInterval(() => setInRadius((prev) => !prev), 10000);
    return () => {
      clearInterval(timer);
      clearInterval(radiusTimer);
    };
  }, []);

  const formatDateTime = (date: Date) => {
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
    } ${date.getFullYear()} ${date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`;
  };

  const handleSOS = () => {
    alert("SOS dikirim!");
  };

  const handlePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      base64: false,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    alert("Report & Foto berhasil dikirim!");
    setReport("");
    setPhoto(null);
  };

  return (
    <>
      <HeaderTab
        title="Detail Patrol"
        withBack={true}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.areaBox}>
            <Text style={styles.areaTitle}>{area.name}</Text>
            <Text style={styles.areaDesc}>{area.description}</Text>
          </View>
          <View style={styles.statusBox}>
            {inRadius ? (
              <>
                <CheckCircle size={40} color="#26A69A" />
                <Text style={styles.statusText}>In Radius</Text>
                <Text style={styles.waitText}>
                  Mohon tunggu, Anda sudah check-in area.
                </Text>
              </>
            ) : (
              <>
                <AlertTriangle size={40} color="#FFD600" />
                <Text style={[styles.statusText, { color: "#FFD600" }]}>
                  Out of Radius
                </Text>
                <Text style={styles.waitText}>
                  Anda belum berada di area. Silakan menuju lokasi.
                </Text>
              </>
            )}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Waktu</Text>
            <Text style={styles.infoValue}>{formatDateTime(currentTime)}</Text>
          </View>

          <Text style={styles.inputLabel}>Report / Catatan</Text>
          <TextInput
            style={styles.input}
            placeholder="Tulis laporan patroli..."
            value={report}
            onChangeText={setReport}
            multiline
            numberOfLines={8}
          />

          <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photoBtn} onPress={handlePhoto}>
              <Camera size={22} color="#FFF" />
              <Text style={styles.photoBtnText}>Upload Foto</Text>
            </TouchableOpacity>
            {photo && (
              <View style={styles.photoPreviewWrapper}>
                <Image source={{ uri: photo }} style={styles.photoPreview} />
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.submitWrapper}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Send size={22} color="#FFF" />
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#F8FAFC",
  },
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 20 },
  statusBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 24,
    marginBottom: 18,
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#26A69A",
    marginTop: 8,
  },
  waitText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  areaBox: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    alignItems: "center",
  },
  areaTitle: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  areaDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    marginBottom: 18,
  },
  infoLabel: { fontSize: 13, color: "#6B7280" },
  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    minHeight: 140,
    marginBottom: 12,
    elevation: 1,
    textAlignVertical: "top",
  },
  photoSection: {
    marginBottom: 16,
  },
  photoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#26A69A",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: "100%",
  },
  photoBtnText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 15,
  },
  photoPreviewWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    resizeMode: "cover",
  },
  submitWrapper: {
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#26A69A",
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: "center",
    paddingHorizontal: 14,
    width: "100%",
  },
  submitText: { color: "#FFF", fontWeight: "bold", marginLeft: 8, fontSize: 16 },
});