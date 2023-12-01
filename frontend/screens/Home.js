import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { Table } from '../components/Table'
import { fetchFeedItem } from '../api/fetch/fetchFeedItem'
import { FeedItemForm } from '../components/FeedItemForm'
import { FloatingSumView } from '../components/FloatingSummation'
import { getFilteredFoodItems } from '../utils/Others'
import { FloatingButton } from '../components/FloatingButton'

const BASE_PATH_DEVELOPMENT = 'http://192.168.1.79:8000/'

export default function HomeScreen () {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Submission form related flag whether is visible
  const [submissionVisible, setSubmissionVisible] = useState(false)

  // Set today's date to display
  const todayDate = new Date().toISOString().split('T')[0]

  useEffect(() => { fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT) }, [submissionVisible])

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Table foodItems={data} setFoodItems={setData} requiredDate={todayDate} />
      </View>

      <FeedItemForm
        isVisible={submissionVisible}
        onClose={() => { setSubmissionVisible(false) }}
        onSubmit={() => {
          setSubmissionVisible(false)
        }}
      />
      <FloatingButton onPress={() => {
        setSubmissionVisible(true)
      }} />
      <FloatingSumView data={getFilteredFoodItems(data, todayDate)} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  table: {
    flex: 1,
    marginTop: '15%',
    marginBottom: '25%',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
})
