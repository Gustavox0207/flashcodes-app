import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config/firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // NOVO ESTADO: Controla qual interface mostrar (Login ou Cadastro)
  const [isLoginView, setIsLoginView] = useState(true);

  // Unificamos a função do botão principal. Ela decide o que fazer baseada no estado.
  const handleAuth = () => {
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    if (isLoginView) {
      // Executa o Login
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Login realizado!");
          navigation.replace('MainApp');
        })
        .catch((error) => {
          setErrorMessage(traduzirErroFirebase(error.code));
          setIsLoading(false);
        });
    } else {
      // Executa o Cadastro
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Cadastro realizado!");
          navigation.replace('MainApp');
        })
        .catch((error) => {
          setErrorMessage(traduzirErroFirebase(error.code));
          setIsLoading(false);
        });
    }
  };

  // Função para alternar entre as telas de Login e Cadastro
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setErrorMessage(''); // Limpa erros antigos ao trocar de tela
    setEmail('');        // Limpa os campos para uma nova ação
    setPassword('');
  };

  const traduzirErroFirebase = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email': return 'O formato do e-mail é inválido.';
      case 'auth/user-not-found': return 'Usuário não encontrado. Verifique o e-mail.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      case 'auth/email-already-in-use': return 'Esse e-mail já está cadastrado.';
      case 'auth/weak-password': return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/invalid-credential': return 'Credenciais inválidas. Verifique seu e-mail e senha.';
      default: return 'Ocorreu um erro na autenticação.';
    }
  };

  return (
    <SafeAreaView style={styles.centerContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* O ícone muda dependendo da tela */}
      <Ionicons 
        name={isLoginView ? "terminal-outline" : "person-add-outline"} 
        size={80} 
        color="#00FFFF" 
        style={{ marginBottom: 20 }} 
      />
      
      {/* O título muda dependendo da tela */}
      <Text style={styles.loginTitle}>
        {isLoginView ? 'Acessar ' : 'Nova Conta '}
        <Text style={{color: '#9D00FF'}}>FlashCode</Text>
      </Text>
      
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <TextInput 
        style={styles.loginInput} 
        placeholder="E-mail" 
        placeholderTextColor="#888" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" 
        keyboardType="email-address"
      />
      
      <TextInput 
        style={styles.loginInput} 
        placeholder="Senha" 
        placeholderTextColor="#888" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={handleAuth}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#000" />
        ) : (
          // O texto do botão principal muda
          <Text style={styles.primaryButtonText}>
            {isLoginView ? 'INICIAR SESSÃO' : 'CRIAR CONTA'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={toggleView}
        disabled={isLoading}
      >
        {/* O texto do rodapé muda para inverter a ação */}
        <Text style={styles.secondaryText}>
          {isLoginView ? 'Novo recruta? ' : 'Já possui acesso? '}
          <Text style={styles.highlightText}>
            {isLoginView ? 'Criar conta' : 'Entrar'}
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 20 },
  loginTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 20, textAlign: 'center' },
  loginInput: { width: '100%', backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 16, marginBottom: 16, color: '#FFF', fontSize: 16 },
  primaryButton: { width: '100%', backgroundColor: '#00FFFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10, shadowColor: '#00FFFF', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 },
  primaryButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { marginTop: 24, padding: 10 },
  secondaryText: { color: '#888', fontSize: 14 },
  highlightText: { color: '#00FFFF', fontWeight: 'bold' },
  errorContainer: { backgroundColor: 'rgba(255, 50, 50, 0.2)', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#FF3333', width: '100%', marginBottom: 20 },
  errorText: { color: '#FF6666', textAlign: 'center', fontWeight: '600' }
});