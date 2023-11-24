import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: '#007AFF', // Adjust the color as needed
    borderRadius: 30,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Android-only: Add a subtle shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});