//TrailScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import axios from "axios";
import { useUser } from "../UserContext";
import {
  responsiveWidth,
  responsiveScreenHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const TrailScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isBotWriting, setIsBotWriting] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(300)).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user && user.id) {
      fetchMessages(user.id);
    }
  }, [user]);

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(
        `http://192.168.8.153:3000/conversations/${userId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const saveConversation = async (userId, conversationContent) => {
    try {
      const response = await axios.post(
        "http://192.168.8.153:3000/saveConversation",
        {
          userId,
          content: conversationContent,
        }
      );
      console.log("Conversation saved. ID:", response.data.conversationId);
    } catch (error) {
      console.error("Failed to save conversation:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = { role: "user", content: inputText };
    setIsBotWriting(true);
    try {
      const botResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ ...userMessage }],
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
        content: botResponse.data.choices[0].message.content,
      };
      const updatedMessages = [...messages, userMessage, botMessage];

      setMessages(updatedMessages);
      setIsBotWriting(false);
      setHasSentMessage(true);


     
      await saveConversation(user.id, updatedMessages);

     
      setInputText("");
    } catch (error) {
      console.error("Error sending or saving message:", error);
      setIsBotWriting(false);
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
                `http://192.168.8.153:3000/conversations/${user.id}`
              );
              setMessages([]);
              setHasSentMessage(false);
            } catch (error) {
              console.error("Error clearing messages:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  


  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: isMenuVisible ? 300 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  
    Animated.timing(contentAnimation, {
      toValue: isMenuVisible ? 0 : -300,
      duration: 200,
      useNativeDriver: true,
    }).start();
  
    setMenuVisible(!isMenuVisible);
  };


  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.navigate("Landing");
          },
        },
      ],
      { cancelable: false }
    );
  };


  const defaultQuestions = [
    "How to start investing on crypto?",
    "What is blockchain?",
    "Who was the first person ever buying bitcoin?",
    "Who is Satoshi Nakamoto?",
   
  ];
  
  const validateMessageContent = (content) => {
    if (typeof content === "string") {
      return content;
    }
   
    console.warn("Invalid content type:", typeof content, content);
    return "";
  };

  const clearInput = () => setInputText("");

  const Separator = () => <View style={styles.separator} />;

  return (
    
      <View style={styles.container}>
        <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: menuAnimation }],
          },
        ]}
      >
          <View style={styles.content1}>
          <Text style={styles.welcome}>Hi, {user ? user.username : "Guest"}</Text>
          <Text style={{ paddingLeft: 2,}}>{user.email}</Text>
          <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Text style={styles.text3}>Account</Text>
            </TouchableOpacity>
          </View> 
          <View style={styles.box}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.cryptrail.pt/support.html')}>
              <Text style={styles.text2}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.cryptrail.pt/terms.html')}>
              <Text style={styles.text2}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View> 
          <View style={styles.box}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.text3}>Log Out</Text>
            </TouchableOpacity>
          </View> 
          <View style={styles.links}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.cryptrail.pt')}>
              <Image source={require("../assets/site.png")} style={styles.socialM}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/rodrigo.lf6')}>
              <Image source={require("../assets/instagram.png")} style={styles.socialM}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/LFtech6')}>
              <Image source={require("../assets/github.png")} style={styles.socialM}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/rodrigo-lopes-ferreira-238906236/')}>
              <Image source={require("../assets/linkedin.png")} style={styles.socialM}/>
            </TouchableOpacity>
          </View> 
          </View>
        </Animated.View>
        <Animated.View
        style={[
          { flex: 1 },
          {
            transform: [{ translateX: contentAnimation }],
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Trail</Text>
          <TouchableOpacity style={styles.hamMenu} onPress={toggleMenu}>
              <Image
                style={styles.imageStyle}
                source={require("../assets/profile.png")}
              />
            </TouchableOpacity>
        </View>
        <Separator />
        <ScrollView style={styles.messageContainer}>
          {messages.map((message, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  message.role === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.content}</Text>
              </View>
            );
          })}

          {isBotWriting && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator style={styles.loading} />
              <Text style={styles.loadingText}>Writing you a message...</Text>
            </View>
          )}
        </ScrollView>
        {!hasSentMessage && (
      <ScrollView horizontal style={styles.defaultQuestionsContainer}>
        {defaultQuestions.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={styles.defaultQuestion}
            onPress={() => {
              setInputText(question);
              setHasSentMessage(true);
            }}
          >
            <View style={styles.question}>
              <Text style={styles.textQ}>{question}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}
    <View style={{marginBottom: 3}}>
        <TouchableOpacity
          onPress={clearMessages}
          style={styles.clearMessagesButton}
        >
          <Text style={styles.text}>Clear Messages</Text>
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
              <Image source={require('../assets/times-circle.png')} style={styles.Icon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Image source={require('../assets/paper-plane.png')} style={styles.Icon}/>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        </View>
        </Animated.View>
      </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#FFD464",
    width: "100%",
    marginVertical: 8,
  },
  container: {
    flex: 1,
    marginBottom: 80,
    padding: 10,
    backgroundColor: "#fff",
  },
  hamMenu: {
    position: "absolute",
    right: 0,
    top: 31,
    padding: 20,
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#E4E3E3',
    width: 300,
    height: '100%',
    right: 0,
    padding: 20,
    zIndex: 2,
  },
  welcome: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    marginTop: 70,
  },
  content: {
    marginTop: 10,
    paddingTop: 40,
  },
  box: {
    padding: 10,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: "#D3D3D3",
  },
  text1: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text2: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text3: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    color: "white",
  },
  links: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    marginTop: 100,
  },
  socialM: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },

  logo: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    marginTop: responsiveScreenHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: responsiveWidth(0.3),
    marginTop: responsiveScreenHeight(5.8),
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
    borderWidth: 1,
    borderColor: "#FFD464",
  },
  clearButton: {
    padding: 10,
  },
  clearMessagesButton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FFD464",
    borderRadius: 50,
    width: "28%",
    alignSelf: "flex-end",
    marginBottom: -10,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
  sendButton: {
    padding: 10,
  },
  Icon: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    marginRight: 10,
  },
  loadingText: {
    fontSize: 16,
  },
  defaultQuestionsContainer: {
    flexDirection: 'row',
    paddingTop: 540,
  },
  defaultQuestion: {
    marginRight: 20,
    borderRadius: 5,
  },
  question: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FFD464",
    borderRadius: 50,
  },
  textQ: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default TrailScreen;
