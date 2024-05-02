import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure you have installed this package
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveWidth,
  responsiveScreenHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useUser } from "../UserContext";

const TrailScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user && user.userId) {
      fetchMessages(user.userId);
    }
  }, [user]);

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(
        `http://10.0.35.193:3000/conversations/${userId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return; // Don't send empty messages
    const userMessage = { role: "user", content: inputText };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [userMessage],
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer sk-proj-aVKnxkecomwLBFdWmrWgT3BlbkFJjfllx1tX46NeXj31Tx6t",
          },
        }
      );

      const botMessage = {
        role: "bot",
        content: response.data.choices[0].message.content,
      };

      const updatedMessages = [...messages, userMessage, botMessage];
      setMessages(updatedMessages);
      await axios.post(`http://10.0.35.193:3000/saveConversation`, {
        userId: user.userId,
        content: updatedMessages,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const clearMessages = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete all messages?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled."),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await axios.delete(
                `http://10.0.35.193:3000/conversations/${user.userId}`
              );
              setMessages([]);
            } catch (error) {
              console.error("Error clearing messages:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const clearInput = () => {
    setInputText("");
  };

  const Seperator = () => <View style={styles.seperator} />;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row'}}>
      <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
      <Text style={styles.title}>Trail</Text>
      </View>
      <Seperator />
      <ScrollView style={styles.messageContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.role === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={clearMessages}
        style={styles.clearMessagesButton}
      >
        <Text>Clear Messages</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setInputText}
            value={inputText}
            placeholder="Write your message..."
          />
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Icon name="times-circle" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Icon name="paper-plane" size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  Seperator: {
    height: 1,
    backgroundColor: '#FFD464',
    width: '100%',
    marginVertical: 8,
  },
  container: {
    flex: 1,
    marginBottom: 80,
    padding: 10,
  },
  logo: { 
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    marginTop: responsiveScreenHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: responsiveWidth(0.3),
    marginTop: responsiveScreenHeight(5.8),
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: "#1a73e8",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#e0f0e0",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 50,
    marginRight: 10,
  },
  clearButton: {
    padding: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default TrailScreen;