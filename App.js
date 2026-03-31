import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FocusableElement = ({ children, onPress, style, focusStyle }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessible={true}
      accessibilityRole="button"
      style={[style, isFocused && (focusStyle || styles.defaultFocus)]}
    >
      {children}
    </Pressable>
  );
};

const Screen1 = () => (
  <View style={styles.screenContainer}>
    <View style={styles.centerContent}>
      <Text style={styles.title}>Tela 1: Início</Text>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/616/616430.png' }}
        style={styles.catImage}
        accessible={true}
        accessibilityLabel="Ícone de um gato"
      />
    </View>
  </View>
);

const Screen2 = () => {
  const cards = [1, 2, 3, 4, 5];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topBar}>
        <FocusableElement style={styles.iconButton}>
          <Ionicons name="search" size={24} color="#333" />
        </FocusableElement>
        <FocusableElement style={styles.iconButton}>
          <Ionicons name="notifications" size={24} color="#333" />
        </FocusableElement>
      </View>

      <Text style={styles.title}>Tela 2: Lista de Cards</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cards.map((card) => (
          <FocusableElement key={card} style={styles.card}>
            <Text style={styles.cardText}>Card {card}</Text>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </FocusableElement>
        ))}
      </ScrollView>
    </View>
  );
};

const Screen3 = () => {
  const [isInput1Focused, setIsInput1Focused] = useState(false);
  const [isInput2Focused, setIsInput2Focused] = useState(false);

  const handleEnviar = () => {
    Keyboard.dismiss();
    Alert.alert('Sucesso!', 'Os dados foram enviados.');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screenContainer}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Tela 3: Formulário</Text>
          
          <TextInput
            style={[styles.input, isInput1Focused && styles.defaultFocus]}
            placeholder="Digite um texto..."
            onFocus={() => setIsInput1Focused(true)}
            onBlur={() => setIsInput1Focused(false)}
            accessible={true}
            accessibilityLabel="Campo de entrada de texto"
          />

          <TextInput
            style={[styles.input, isInput2Focused && styles.defaultFocus]}
            placeholder="Digite um número..."
            keyboardType="numeric"
            onFocus={() => setIsInput2Focused(true)}
            onBlur={() => setIsInput2Focused(false)}
            accessible={true}
            accessibilityLabel="Campo de entrada numérica"
          />

          <FocusableElement 
            style={styles.submitButton} 
            onPress={handleEnviar}
          >
            <Text style={styles.submitButtonText}>Enviar</Text>
          </FocusableElement>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Screen1');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.mainContent}>
        {currentScreen === 'Screen1' && <Screen1 />}
        {currentScreen === 'Screen2' && <Screen2 />}
        {currentScreen === 'Screen3' && <Screen3 />}
      </View>

      <View style={styles.bottomNav}>
        <FocusableElement 
          style={styles.navItem} 
          onPress={() => setCurrentScreen('Screen1')}
        >
          <Ionicons 
            name={currentScreen === 'Screen1' ? "home" : "home-outline"} 
            size={28} 
            color={currentScreen === 'Screen1' ? "#007BFF" : "#666"} 
          />
          <Text style={styles.navText}>Tela 1</Text>
        </FocusableElement>

        <FocusableElement 
          style={styles.navItem} 
          onPress={() => setCurrentScreen('Screen2')}
        >
          <Ionicons 
            name={currentScreen === 'Screen2' ? "list" : "list-outline"} 
            size={28} 
            color={currentScreen === 'Screen2' ? "#007BFF" : "#666"} 
          />
          <Text style={styles.navText}>Tela 2</Text>
        </FocusableElement>

        <FocusableElement 
          style={styles.navItem} 
          onPress={() => setCurrentScreen('Screen3')}
        >
          <Ionicons 
            name={currentScreen === 'Screen3' ? "settings" : "settings-outline"} 
            size={28} 
            color={currentScreen === 'Screen3' ? "#007BFF" : "#666"} 
          />
          <Text style={styles.navText}>Tela 3</Text>
        </FocusableElement>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainContent: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  catImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    tintColor: '#007BFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  defaultFocus: {
    borderColor: '#FF9800',
    borderWidth: 2,
    backgroundColor: '#FFF3E0',
  },
});