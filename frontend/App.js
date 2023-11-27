import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Table } from './components/Table';
import { FloatingButton } from './components/FloatingButton';
import { fetchFeedItem } from './api/fetch/fetchFeedItem';
import { FeedItemForm } from './components/FeedItemForm';

BASE_PATH_DEVELOPMENT = `http://192.168.1.79:8000/`

const Drawer = createDrawerNavigator()

const HomeScreen = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Submission form related flag whether is visible
  const [submissionVisible, setSubmissionVisible] = useState(false)

  useEffect(() => { fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT); }, [submissionVisible])

  return (
    <View style={styles.container}>
      <Table foodItems={data} setFoodItems={setData} />
      <FeedItemForm
        isVisible={submissionVisible}
        onClose={() => { setSubmissionVisible(false) }}
        onSubmit={() => {
          setSubmissionVisible(false);
          fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT);
        }}
      />
      <FloatingButton onPress={() => {
        setSubmissionVisible(true);
        fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT);
      }} />
      <StatusBar style="auto" />
    </View>
  );
}

function HistoryScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>History Screen of Dais-Dais cuteness, PLACEHOLDER</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `white`,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
