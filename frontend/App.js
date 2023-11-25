import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Table } from './components/Table';
import { FloatingButton } from './components/FloatingButton';
import { fetchFeedItem } from './api/fetch/fetchFeedItem';
import { FeedItemForm } from './components/FeedItemForm';

BASE_PATH_DEVELOPMENT = `http://192.168.1.79:8000/`


export default function App() {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Submission form related flag whether is visible
  const [submissionVisible, setSubmissionVisible] = useState(false)

  // Temporary adding item handler function
  const addFeedItem = (itemName) => {
    console.log(`Adding item ${itemName}`);
    setSubmissionVisible(true)
  }

  useEffect(() => { fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT); }, [submissionVisible])

  return (
    <View style={styles.container}>
      <Table foodItems={data} />
      <FeedItemForm
        isVisible={submissionVisible}
        onClose={() => { setSubmissionVisible(false) }}
        onSubmit={() => {
          addFeedItem();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `white`,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
