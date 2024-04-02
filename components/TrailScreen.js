import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  SafeAreaView,
  Alert,
  StatusBar
} from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrailScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSendingAllowed, setIsSendingAllowed] = useState(true);
  
  useEffect(() => {
    loadMessages();
    StatusBar.setBarStyle('light-content');
  }, []);
  
  useEffect(() => {
    let timer;
    if (!isSendingAllowed) {
      timer = setTimeout(() => {
        setIsSendingAllowed(true);
      }, 5000); // Set cooldown time to 5 seconds
    }
    return () => timer && clearTimeout(timer);
  }, [isSendingAllowed]);
  
  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Failed to save messages.', error);
    }
  };
  
  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Failed to load messages.', error);
    }
  };
  
  const handleSendMessage = async () => {
    if (!message.trim() || !isSendingAllowed) return;
    
    const userMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: 'user',
    };
    
    setMessage('');
    setIsSendingAllowed(false);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Set timeout to 10 seconds
    
    try {
      const response = await fetch('http://148.69.4.99:4000/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage.text }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (error) {
    console.error('Error sending message:', error);
  }
  
  setIsSendingAllowed(true);
};


const clearMessages = async () => {
  try {
    await AsyncStorage.removeItem('messages');
    setMessages([]);
  } catch (error) {
    console.error('Failed to clear messages.', error);
  }
};

const handleClearPress = () => {
  Alert.alert(
    "Clear Messages",
    "Are you sure you want to delete all messages?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: clearMessages }
    ]
    );
  };
  
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <SafeAreaView style={styles.innerContainer}>
    <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileButton}>
    <Image source={require('../assets/profile.png')} style={styles.user}/>
    </TouchableOpacity>
    
    <Text style={styles.title}>Trail</Text>
    <View style={styles.separator}/>
    
    <FlatList
    style={styles.flatList}
    data={messages}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={[styles.message, item.sender === 'bot' ? styles.botMessage : styles.userMessage]}>
      <Text style={[styles.messageText, item.sender === 'bot' ? styles.botMessageText : styles.userMessageText]}>{item.text}</Text>
      </View>
      )}
      inverted
      />
      
      <View style={styles.send}>
      <TextInput 
      placeholder='Message' 
      style={styles.input} 
      value={message} 
      onChangeText={setMessage} 
      onSubmitEditing={handleSendMessage}
      editable={isSendingAllowed}
      placeholderTextColor="#666"
      />
      <TouchableOpacity onPress={handleSendMessage} disabled={!isSendingAllowed} style={styles.sendButton}>
      <Image source={require('../assets/seta.png')} style={styles.sent} />
      </TouchableOpacity>
      </View>
      {!isSendingAllowed && <Text style={styles.cooldownText}>Wait for 5 seconds...</Text>}
      <TouchableOpacity onPress={handleClearPress} style={styles.clearButton}>
      <Text style={styles.clearButtonText}>Clear Messages</Text>
      </TouchableOpacity>
      </SafeAreaView>
      </KeyboardAvoidingView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginBottom: 80,
      },
      innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
      },
      profileButton: {
        marginTop: responsiveHeight(5),
        alignSelf: 'flex-end',
        marginRight: 20,
      },
      user: {
        height: responsiveHeight(5),
        width: responsiveWidth(10),
        resizeMode: 'contain',
      },
      title: {
        fontSize: 35,
        marginTop: responsiveHeight(2),
      },
      separator: {
        height: 1,
        width: '90%',
        backgroundColor: '#FFD464',
        marginVertical: responsiveHeight(2),
      },
      flatList: {
        width: '140%',
        paddingHorizontal: 5,
        marginBottom: responsiveHeight(3),
      },
      message: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginVertical: 5,
        minWidth: '10%',
        maxWidth: '40%',
        marginBottom: 10,
      },
      messageText: {
        fontSize: 16,
      },
      botMessage: {
        backgroundColor: '#333',
        marginLeft: 100,
        paddingHorizontal: 20,
      },
      botMessageText: {
        color: 'white',
      },
      userMessage: {
        backgroundColor: '#FFD464',
        alignSelf: 'flex-end',
        marginHorizontal: 100,
      },
      userMessageText: {
        color: 'black',
      },
      send: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FFD464',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
      },
      input: {
        flex: 1,
        marginRight: 10,
        color: '#333',
      },
      sent: {
        height: responsiveHeight(3),
        width: responsiveWidth(6),
      },
      cooldownText: {
        color: '#FFD464',
        textAlign: 'center',
      },
      clearButton: {
        position: 'absolute',
        right: 20,
        bottom: responsiveHeight(5),
        padding: 10,
        backgroundColor: '#FFD464',
        borderRadius: 20,
      },
      clearButtonText: {
        color: '#333',
      },
    });
    
    export default TrailScreen;
    