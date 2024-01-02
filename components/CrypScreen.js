import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendToAI = async () => {
    const updatedMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(updatedMessages);

    try {
      const response = await axios.post('http://192.168.1.191:3000/ask', { messages: [{ role: "user", content: userInput }] });
      setMessages([...updatedMessages, { sender: 'ai', text: response.data.reply }]);
    } catch (error) {
      console.error('Error communicating with AI:', error);
    }

    setUserInput('');
  };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={userInput}
                    onChangeText={setUserInput}
                    placeholder='Ask Something'
                />
                <Button title="Send" onPress={sendToAI} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingBottom: 50, // Adjust for bottom tab navigator
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#086CF5',
        borderRadius: 20,
        padding: 10,
        margin: 5,
        maxWidth: '80%', // Limit width for better appearance
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        borderRadius: 20,
        padding: 10,
        margin: 5,
        maxWidth: '80%', // Limit width for better appearance
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1, // Add separation line
        borderColor: '#DDD', // Light grey border for subtle separation
    },
    input: {
        flex: 1,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#ECECEC',
        borderRadius: 20,
    },
});

export default ChatComponent;
