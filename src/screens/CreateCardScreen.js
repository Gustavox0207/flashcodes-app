import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export default function CreateCardScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveCard = async () => {
    // Validação simples
    if (!title || !subtitle) {
      alert('Aviso: O título e a pergunta (subtítulo) são obrigatórios.');
      return;
    }

    setIsLoading(true);

    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        alert('Erro: Você precisa estar logado para criar um card.');
        setIsLoading(false);
        return;
      }

      // Salvando no Firestore
      await addDoc(collection(db, 'flashcards'), {
        title,
        subtitle,
        code,
        description,
        userId: currentUser.uid, // Fundamental: vincula o card ao seu usuário
        createdAt: new Date()
      });

      console.log("Card salvo com sucesso!");
      
      // Volta para o Dashboard
      navigation.goBack(); 
      
    } catch (error) {
      console.error("Erro ao salvar card:", error);
      alert('Erro ao salvar o card. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Criar <Text style={{color: '#9D00FF'}}>FlashCard</Text></Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Tema / Linguagem *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: React Native, Python, Conceitos" 
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Pergunta principal *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: O que é o useEffect?" 
          placeholderTextColor="#666"
          value={subtitle}
          onChangeText={setSubtitle}
        />

        <Text style={styles.label}>Trecho de Código (Opcional)</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Cole um código de exemplo aqui..." 
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={code}
          onChangeText={setCode}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Resposta / Explicação</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Explique o conceito ou a resposta..." 
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveCard}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.saveButtonText}>SALVAR CARD</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#333' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', textAlign: 'center' },
  formContainer: { padding: 20 },
  label: { color: '#E0E0E0', fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
  input: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 16, marginBottom: 20, color: '#FFF', fontSize: 16 },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#00FFFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10, shadowColor: '#00FFFF', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 },
  saveButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});