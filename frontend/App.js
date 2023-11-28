import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { Table } from './components/Table';
import { FloatingButton } from './components/FloatingButton';
import { fetchFeedItem } from './api/fetch/fetchFeedItem';
import { FeedItemForm } from './components/FeedItemForm';
import { HexagonMask } from './components/HexagonMask';

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
      <SafeAreaView>
        <View>
          <Image source={require("./assets/daisy_navigator.jpeg")} alt="daisy" style={{ width: 200, height: 200 }} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const DrawerContent = () => {
  return (<SafeAreaView>
    <View>
      {/* <Image source={require("./assets/daisy_navigator.jpeg")} alt="daisy" style={{ width: 50, height: 50 }} /> */}
      <Text>Try...</Text>
    </View>
  </SafeAreaView>)
}

const CustomDrawerHeader = () => {
  return (
    <View style={styles.drawerHeader}>
      <Image
        source={require("./assets/daisy_navigator.jpeg")} // Replace with the actual path
        style={styles.logo}
      />
      {/* <HexagonMask imageSource={'./assets/daisy_navigator.jpeg'} size={200} cornerRadius={10} /> */}
      <Text style={styles.drawerHeaderText}>Daisy Feeder</Text>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerHeader />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      {/* <HexagonMask imageSource={'assets/daisy_navigator.jpeg'} size={200} cornerRadius={10} /> */}

      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => {
        return (
          <CustomDrawerContent {...props} />
        )
      }}>
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
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 12,
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
