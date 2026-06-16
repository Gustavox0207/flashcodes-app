import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import CreateCardScreen from '../screens/CreateCardScreen';

// Importando as Telas
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle: { backgroundColor: '#1E1E1E' },
      headerTintColor: '#00FFFF',
      headerTitleStyle: { fontWeight: 'bold' }
    }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={({ route }) => ({ title: route.params.card.title })} />
      
      {/* Adicione a tela aqui dentro! */}
      <Stack.Screen name="CreateCard" component={CreateCardScreen} options={{ title: 'Novo Flashcard' }} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#121212' }}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 10 }}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem 
        label="Sair (Logout)" 
        labelStyle={{ color: '#FF0055', fontWeight: 'bold' }}
        icon={({ size }) => <Ionicons name="log-out-outline" size={size} color="#FF0055" />}
        onPress={() => props.navigation.replace('Login')} 
      />
    </DrawerContentScrollView>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#1E1E1E', shadowColor: 'transparent', elevation: 0 },
        headerTintColor: '#00FFFF',
        drawerActiveTintColor: '#00FFFF',
        drawerInactiveTintColor: '#A0A0A0',
        drawerActiveBackgroundColor: '#1A1A1A',
        sceneContainerStyle: { backgroundColor: '#121212' }
      }}
    >
      <Drawer.Screen 
        name="Início" 
        component={HomeStack} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }} 
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={AppDrawer} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerTitle: { fontSize: 22, fontWeight: 'bold', color: '#00FFFF' }
});