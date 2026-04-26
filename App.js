import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, 
  Modal, TextInput, Switch, Button, SafeAreaView, StatusBar 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

// --- DADOS MOCKADOS ---
const DECK_COVER_URL = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

const flashcardsData = [
  {
    id: '1',
    title: 'Hook de Estado',
    subtitle: 'useState',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'const [count, setCount] = useState(0);',
    description: 'O hook useState é uma função fundamental no React e React Native que permite adicionar e gerenciar o estado local em componentes funcionais. Ele retorna um array com duas posições: o valor atual do estado e uma função dedicada para atualizá-lo, garantindo a re-renderização da interface sempre que houver mudanças. Essa ferramenta substituiu a necessidade de classes para gerenciar variáveis dinâmicas.'
  },
  {
    id: '2',
    title: 'Efeitos Colaterais',
    subtitle: 'useEffect',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'useEffect(() => {\n  fetchData();\n}, []);',
    description: 'O hook useEffect é utilizado para lidar com efeitos colaterais em componentes funcionais, como chamadas de APIs externas, subscrições de banco de dados ou manipulação manual do DOM. Ele é executado logo após a renderização do componente e pode ser configurado com um array de dependências para controlar com precisão matemática exatamente quando o efeito deve ser disparado novamente pelo ciclo de vida.'
  },
  {
    id: '3',
    title: 'Listas Otimizadas',
    subtitle: 'FlatList',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: '<FlatList data={data} renderItem={renderItem} />',
    description: 'A FlatList é um componente essencial e altamente otimizado para renderizar listas extensas de dados no React Native. Diferente de um ScrollView comum, ela consome memória de forma inteligente, renderizando ativamente apenas os itens que estão visíveis na tela do usuário no momento, o que garante excelente performance em dispositivos móveis mesmo com milhares de registros complexos.'
  },
  {
    id: '4',
    title: 'Estilização Padrão',
    subtitle: 'StyleSheet',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'const styles = StyleSheet.create({ container: {} });',
    description: 'A API StyleSheet do React Native é a maneira padrão e mais eficiente de criar estilos e aplicar um design visualmente consistente aos componentes. Semelhante ao CSS tradicional do desenvolvimento web, ela permite definir regras de estilização em objetos JavaScript puros, proporcionando validação de propriedades em tempo de compilação e melhorando significativamente a legibilidade e a manutenção do código fonte.'
  },
  {
    id: '5',
    title: 'Armazenamento Local',
    subtitle: 'AsyncStorage',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'await AsyncStorage.setItem("@key", value);',
    description: 'O AsyncStorage é um sistema de armazenamento de dados chave-valor, não criptografado e estritamente assíncrono, ideal para persistir informações simples localmente no dispositivo. É frequentemente utilizado em aplicativos móveis para salvar preferências de tema do usuário, tokens de autenticação JWT ou pequenos volumes de dados necessários para o funcionamento offline e para o sistema de repetição espaçada do seu app.'
  }
];

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [picker1, setPicker1] = useState('React');
  const [picker2, setPicker2] = useState('Fácil');
  const [slider1, setSlider1] = useState(1);
  const [slider2, setSlider2] = useState(50);
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);

  const openCardDetails = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerCard}>
          <Image source={{ uri: DECK_COVER_URL }} style={styles.mainImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.mainTitle}>Deck: React Native</Text>
            <Text style={styles.mainDescription}>
              No universo do desenvolvimento mobile, domine os conceitos fundamentais construindo conhecimento sólido. Explore componentes nativos, gerenciamento de estado e prepare-se para construir interfaces complexas.
            </Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Linguagem: <Text style={styles.highlightNeonBlue}>JavaScript</Text></Text>
          <Text style={styles.infoText}>Avaliação: <Text style={styles.highlightNeonPurple}>4.8 / 5.0</Text></Text>
          <Text style={styles.infoText}>Tamanho: 50 cards</Text>
          <Text style={styles.infoText}>Atualizado em: 2026-03-10</Text>
        </View>

        <Text style={styles.sectionTitle}>Flashcards</Text>

        {flashcardsData.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.listItem} 
            onPress={() => openCardDetails(item)}
          >
            <View style={styles.imageNeonBorder}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.openFormButton} 
          onPress={() => setFormVisible(true)}
        >
          <Text style={styles.openFormButtonText}>+ Criar Novo Card / Configurações</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Modal de Detalhes do Card */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCard && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.imageNeonBorder, { alignSelf: 'center', marginBottom: 16 }]}>
                  <Image source={{ uri: selectedCard.image }} style={styles.modalImage} />
                </View>
                <Text style={styles.modalTitle}>{selectedCard.subtitle}</Text>
                
                <View style={styles.codeViewer}>
                  <Text style={styles.codeText}>{selectedCard.code}</Text>
                </View>

                <Text style={styles.modalDescription}>{selectedCard.description}</Text>
                
                <Text style={styles.spacedRepetitionTitle}>Como foi o estudo?</Text>
                <View style={styles.spacedRepetitionRow}>
                   <Button title="Fácil" color="#00FFFF" onPress={() => setModalVisible(false)} />
                   <Button title="Médio" color="#9D00FF" onPress={() => setModalVisible(false)} />
                   <Button title="Difícil" color="#FF0055" onPress={() => setModalVisible(false)} />
                </View>

                <View style={styles.closeButtonContainer}>
                  <Button title="Fechar Card" color="#333333" onPress={() => setModalVisible(false)} />
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Formulário */}
      <Modal visible={formVisible} animationType="fade">
        <SafeAreaView style={styles.formContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.formMainTitle}>Configurações do Deck</Text>
            
            <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Nome do Card" value={input1} onChangeText={setInput1} />
            <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Trecho de Código" value={input2} onChangeText={setInput2} />
            <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Dica Oculta" value={input3} onChangeText={setInput3} />
            <TextInput style={styles.input} placeholderTextColor="#888" placeholder="Tags (ex: react, hooks)" value={input4} onChangeText={setInput4} />

            <Text style={styles.label}>Tecnologia do Deck:</Text>
            <View style={styles.pickerContainer}>
              <Picker 
                selectedValue={picker1} 
                onValueChange={(val) => setPicker1(val)}
                dropdownIconColor="#00FFFF"
                style={{ color: '#FFF' }}
              >
                <Picker.Item label="React Native" value="React" />
                <Picker.Item label="Python" value="Python" />
                <Picker.Item label="SQL" value="SQL" />
              </Picker>
            </View>

            <Text style={styles.label}>Dificuldade Inicial:</Text>
            <View style={styles.pickerContainer}>
              <Picker 
                selectedValue={picker2} 
                onValueChange={(val) => setPicker2(val)}
                dropdownIconColor="#00FFFF"
                style={{ color: '#FFF' }}
              >
                <Picker.Item label="Iniciante" value="Facil" />
                <Picker.Item label="Intermediário" value="Medio" />
                <Picker.Item label="Avançado" value="Dificil" />
              </Picker>
            </View>

            <Text style={styles.label}>Dias para primeira revisão: {slider1} dias</Text>
            <Slider 
              style={styles.slider} minimumValue={1} maximumValue={30} step={1}
              value={slider1} onValueChange={setSlider1}
              minimumTrackTintColor="#00FFFF" maximumTrackTintColor="#333" thumbTintColor="#9D00FF"
            />

            <Text style={styles.label}>Timer Modo Simulado (segundos): {slider2}s</Text>
            <Slider 
              style={styles.slider} minimumValue={10} maximumValue={120} step={5}
              value={slider2} onValueChange={setSlider2}
              minimumTrackTintColor="#00FFFF" maximumTrackTintColor="#333" thumbTintColor="#9D00FF"
            />

            <View style={styles.switchRow}>
              <Text style={styles.labelSwitch}>Ativar Spaced Repetition</Text>
              <Switch 
                value={switch1} onValueChange={setSwitch1} 
                trackColor={{ false: '#333', true: '#9D00FF' }}
                thumbColor={switch1 ? '#00FFFF' : '#888'}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.labelSwitch}>Ativar Modo Simulado (Timer)</Text>
              <Switch 
                value={switch2} onValueChange={setSwitch2} 
                trackColor={{ false: '#333', true: '#9D00FF' }}
                thumbColor={switch2 ? '#00FFFF' : '#888'}
              />
            </View>

            <View style={styles.formActionButtons}>
              <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={() => setFormVisible(false)}>
                <Text style={styles.btnTextSave}>Salvar Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.cancelBtn]} onPress={() => setFormVisible(false)}>
                <Text style={styles.btnTextCancel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            
          </ScrollView>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

// --- ESTILIZAÇÃO DARK MODE E NEON ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  
  headerCard: {
    backgroundColor: '#1E1E1E', margin: 16, borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: '#333',
  },
  mainImage: { width: '100%', height: 200, opacity: 0.8 },
  headerTextContainer: { padding: 16 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#00FFFF' }, // Azul Neon
  mainDescription: { fontSize: 14, color: '#A0A0A0', lineHeight: 20 },
  
  infoBox: {
    backgroundColor: '#1E1E1E', marginHorizontal: 16, marginBottom: 16, padding: 16,
    borderRadius: 12, borderWidth: 1, borderColor: '#9D00FF' // Roxo Neon
  },
  infoText: { fontSize: 14, color: '#E0E0E0', marginBottom: 4 },
  highlightNeonBlue: { color: '#00FFFF', fontWeight: 'bold' },
  highlightNeonPurple: { color: '#9D00FF', fontWeight: 'bold' },
  
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 12, color: '#FFF' },
  
  listItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    marginHorizontal: 16, marginBottom: 10, padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: '#2A2A2A'
  },
  imageNeonBorder: {
    padding: 2, borderRadius: 30, borderWidth: 2, borderColor: '#00FFFF'
  },
  itemImage: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#333' },
  itemTextContainer: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#E0E0E0' },
  itemSubtitle: { fontSize: 14, color: '#9D00FF', marginTop: 2 }, // Roxo Neon
  chevron: { fontSize: 24, color: '#00FFFF', paddingHorizontal: 8 },
  
  openFormButton: {
    backgroundColor: '#9D00FF', margin: 16, padding: 16, borderRadius: 12, alignItems: 'center',
    shadowColor: '#9D00FF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 5,
  },
  openFormButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' },
  
  // Modal Detalhes
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#1E1E1E', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 24, maxHeight: '85%', borderWidth: 1, borderColor: '#333'
  },
  modalImage: { width: 56, height: 56, borderRadius: 28 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#00FFFF' },
  codeViewer: { 
    backgroundColor: '#0D0D0D', padding: 16, borderRadius: 8, marginBottom: 16,
    borderLeftWidth: 4, borderLeftColor: '#9D00FF'
  },
  codeText: { color: '#00FFCC', fontFamily: 'monospace', fontSize: 14 },
  modalDescription: { fontSize: 15, color: '#CCCCCC', lineHeight: 22, marginBottom: 20, textAlign: 'justify' },
  spacedRepetitionTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 12, color: '#FFF' },
  spacedRepetitionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  closeButtonContainer: { marginTop: 10 },

  // Formulário
  formContainer: { flex: 1, backgroundColor: '#121212', padding: 20 },
  formMainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#00FFFF', textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 12,
    marginBottom: 16, fontSize: 16, backgroundColor: '#1E1E1E', color: '#FFF'
  },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#A0A0A0', marginTop: 8 },
  labelSwitch: { fontSize: 16, color: '#E0E0E0' },
  pickerContainer: {
    borderWidth: 1, borderColor: '#333', borderRadius: 8, marginBottom: 16, backgroundColor: '#1E1E1E'
  },
  slider: { width: '100%', height: 40, marginBottom: 16 },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A2A'
  },
  formActionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, paddingBottom: 40 },
  actionBtn: { flex: 1, padding: 16, borderRadius: 8, alignItems: 'center', marginHorizontal: 8 },
  saveBtn: { backgroundColor: '#00FFFF' },
  cancelBtn: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#FF0055' },
  btnTextSave: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  btnTextCancel: { color: '#FF0055', fontWeight: 'bold', fontSize: 16 }
});