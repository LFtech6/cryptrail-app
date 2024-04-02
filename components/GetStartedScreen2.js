import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const GetStartedScreen2 = () => {
    return (
        <ScrollView 
            horizontal={true} 
            pagingEnabled={true} 
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
            style={styles.scrollView}
        >
            {/* Each slide will now take up the full width of the screen */}
            <View style={[styles.slide, { width: width }]}>
                <Text style={styles.title}>Welcome to Cryptrail</Text>
                <Image
                    source={require('../assets/adaptive-icon.png')}
                    style={styles.logo}
                />
                {/* Optional: If you have a subtitle or description for this slide, add Text component here */}
            </View>
            <View style={[styles.slide, { width: width }]}>
                <Text style={styles.title}>Leverage AI in your crypto journey.</Text>
                <Text style={styles.description}>
                    There’s only a few apps with AI integrated focused on the crypto market, and Cryptrail is one of them.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#FFD464', // Make the background color consistent
    },
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        padding: 20,
    },
    title: {
        fontSize: 24, // Increase font size
        fontWeight: 'bold',
        color: '#333', // Make text color darker for better contrast
        textAlign: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    description: {
        fontSize: 18, // Increase font size for readability
        color: '#333', // Make text color darker for better contrast
        textAlign: 'center',
        paddingHorizontal: 10, // Add horizontal padding
    },
});

export default GetStartedScreen2;
