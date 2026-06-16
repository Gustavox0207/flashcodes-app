import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.centerContainer}>
      <Ionicons name="person-circle-outline" size={100} color="#9D00FF" />
      <Text style={styles.mainTitle}>Perfil do Usuário</Text>
      <Text style={styles.infoText}>Estatísticas de estudo, metas e configurações do sistema ficarão aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 20 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', marginTop: 10 },
  infoText: { fontSize: 14, color: '#E0E0E0', textAlign: 'center', marginTop: 10, paddingHorizontal: 20 },
});