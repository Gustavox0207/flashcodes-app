import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { card } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24 }}>
        <View style={[styles.imageNeonBorder, { alignSelf: 'center', marginBottom: 16 }]}>
          <Image source={{ uri: card.image }} style={{ width: 80, height: 80, borderRadius: 40 }} />
        </View>
        <Text style={[styles.mainTitle, { textAlign: 'center' }]}>{card.subtitle}</Text>
        
        <View style={styles.codeViewer}>
          <Text style={styles.codeText}>{card.code}</Text>
        </View>

        <Text style={styles.modalDescription}>{card.description}</Text>
        
        <Text style={styles.spacedRepetitionTitle}>Como foi o estudo?</Text>
        <View style={styles.spacedRepetitionRow}>
            <Button title="Fácil" color="#00FFFF" onPress={() => navigation.goBack()} />
            <Button title="Médio" color="#9D00FF" onPress={() => navigation.goBack()} />
            <Button title="Difícil" color="#FF0055" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  imageNeonBorder: { padding: 2, borderRadius: 42, borderWidth: 2, borderColor: '#00FFFF' },
  mainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#00FFFF' }, 
  codeViewer: { backgroundColor: '#0D0D0D', padding: 16, borderRadius: 8, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#9D00FF', width: '100%' },
  codeText: { color: '#00FFCC', fontFamily: 'monospace', fontSize: 14 },
  modalDescription: { fontSize: 15, color: '#CCCCCC', lineHeight: 22, marginBottom: 30, textAlign: 'justify' },
  spacedRepetitionTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#FFF' },
  spacedRepetitionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 },
});