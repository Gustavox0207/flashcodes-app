import React, { useState, useCallback } from 'react'; // Trocamos useEffect por useCallback
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // NOVO IMPORT

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; 

const DECK_COVER_URL = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
const API_KEY = 'qa_sk_9a99be15cad8846a55a9a762a23ec5ea6c5cc795';

function useFlashcards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function fetchAllCards() {
        setIsLoading(true);
        
        let fetchedQuizCards = [];
        let fetchedFirebaseCards = [];

        // ==========================================
        // 1. BUSCA DA QUIZ API 
        // ==========================================
        try {
          // A chave NÃO deve ser enviada como parâmetro na URL.
          const targetUrl = `https://quizapi.io/api/v1/questions?limit=10&tags=JavaScript`;
          
          // Codificamos a URL inteira para o proxy não quebrar os parâmetros.
          const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;
          
          // Se o professor rodar no navegador (Web), usa o proxy. 
          // Se rodar no emulador Mobile (Expo Go), vai direto, pois no mobile não existe CORS!
          const fetchUrl = Platform.OS === 'web' ? proxyUrl : targetUrl;

          // CORREÇÃO: Enviamos a chave de API no cabeçalho Authorization: Bearer,
          // conforme exigido pela documentação oficial da QuizAPI (v2).
          const response = await fetch(fetchUrl, {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
            },
          });
          
          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }

          const data = await response.json();

          // A QuizAPI v2 retorna { success: true, data: [...], meta: {...} }
          if (data.success && data.data && Array.isArray(data.data)) {
            fetchedQuizCards = data.data.map((item) => {
              // Na v2, as respostas corretas estão em item.answers[].isCorrect
              const correctAnswer = item.answers
                ? item.answers.find(a => a.isCorrect === true)
                : null;
              const correctAnswerText = correctAnswer ? correctAnswer.text : 'Sem resposta definida.';

              return {
                id: `quiz_${item.id || Math.random()}`, 
                title: item.category || 'Programação',
                subtitle: item.text || 'Pergunta não encontrada',
                image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
                code: `// Dificuldade: ${item.difficulty || 'N/A'}\n// Quiz: ${item.quizTitle || 'N/A'}`,
                description: item.explanation || `Resposta Correta: ${correctAnswerText}`,
                isCustom: false
              };
            });
          }
        } catch (error) {
          console.error("Erro na busca da API:", error.message);
        }
        // ==========================================
        // 2. BUSCA DO FIRESTORE (Cards do Usuário)
        // ==========================================
        try {
          const currentUser = auth.currentUser;
          
          if (currentUser) {
            const q = query(
              collection(db, "flashcards"), 
              where("userId", "==", currentUser.uid)
            );
            
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              fetchedFirebaseCards.push({
                id: `fb_${doc.id}`,
                title: data.title || 'Personalizado',
                subtitle: data.subtitle || 'Pergunta',
                image: 'https://cdn-icons-png.flaticon.com/512/1162/1162844.png', 
                code: data.code || '// Sem código',
                description: data.description || 'Sem explicação extra.',
                isCustom: true 
              });
            });
          }
        } catch (error) {
          console.error("Erro no Firestore:", error.message);
        }

        // ==========================================
        // 3. COMBINAR E ATUALIZAR O ESTADO
        // ==========================================
        setCards([...fetchedFirebaseCards, ...fetchedQuizCards]);
        setIsLoading(false);
      }

      fetchAllCards();
      
      // O useCallback pede que retornemos uma função de limpeza opcional, aqui não é necessário, então não retornamos nada
    }, [])
  ); // Fechamento do useFocusEffect

  return { cards, isLoading };
}

export default function DashboardScreen({ navigation }) {
  const { cards, isLoading } = useFlashcards();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Image source={{ uri: DECK_COVER_URL }} style={styles.mainImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.mainTitle}>Meu Cofre de Estudos</Text>
            <Text style={styles.mainDescription}>Mistura de questões da QuizAPI e seus cards personalizados.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Flashcards de Hoje</Text>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00FFFF" />
            <Text style={styles.loadingText}>Sincronizando banco de dados...</Text>
          </View>
        ) : (
          cards.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.listItem, 
                item.isCustom ? styles.customCardBorder : null // Adiciona uma borda diferente se o card for do usuário
              ]} 
              onPress={() => navigation.navigate('Details', { card: item })} 
            >
              <View style={styles.imageNeonBorder}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>
                  {item.title} {item.isCustom && <Text style={styles.customBadge}>★</Text>}
                </Text>
                <Text style={styles.itemSubtitle} numberOfLines={2}>{item.subtitle}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))
        )}
        {/* Espaçamento extra no final para o botão não cobrir o último card */}
        <View style={{ height: 80 }} /> 
      </ScrollView>

      {/* Botão Flutuante para criar novos cards */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('CreateCard')} // Certifique-se de que a rota se chama 'CreateCard' no seu navegador principal
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  headerCard: { backgroundColor: '#1E1E1E', margin: 16, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
  mainImage: { width: '100%', height: 180, opacity: 0.8 },
  headerTextContainer: { padding: 16 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#00FFFF' }, 
  mainDescription: { fontSize: 14, color: '#A0A0A0', lineHeight: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 12, color: '#FFF' },
  
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', marginHorizontal: 16, marginBottom: 10, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A' },
  customCardBorder: { borderColor: '#9D00FF' }, // Borda roxa para os cards customizados
  
  imageNeonBorder: { padding: 2, borderRadius: 30, borderWidth: 2, borderColor: '#00FFFF' },
  itemImage: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#333' },
  itemTextContainer: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#E0E0E0' },
  customBadge: { color: '#FFD700', fontSize: 14 }, // Uma estrela dourada para marcar cards próprios
  itemSubtitle: { fontSize: 14, color: '#9D00FF', marginTop: 2 }, 
  chevron: { fontSize: 24, color: '#00FFFF', paddingHorizontal: 8 },

  loadingContainer: { padding: 40, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#00FFFF', marginTop: 16, fontSize: 16, fontWeight: 'bold' },

  // Estilos do Botão Flutuante (FAB)
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#9D00FF',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#9D00FF',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#00FFFF'
  },
  fabIcon: { fontSize: 32, color: '#FFF', fontWeight: 'bold', lineHeight: 36, textAlign: 'center' }
});
