import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import HeaderTab from '../components/header-tab';

interface Area {
  id: string;
  name: string;
  description: string;
}

export default function ListAPScreen({ route, navigation }: { route: any; navigation: any }) {
  const { areas, title } = route.params || { areas: [], title: 'Access Points' };

  const renderItem: ListRenderItem<Area> = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      <ChevronRight size={20} color="#111827" />
    </View>
  );

  return (
    <>
      <HeaderTab title={title} withBack={true} onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        <FlatList data={areas} renderItem={renderItem} keyExtractor={(i) => i.id} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  name: { fontSize: 14, fontWeight: '700', color: '#111827' },
  desc: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});