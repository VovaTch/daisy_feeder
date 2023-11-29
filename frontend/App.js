import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { Table } from './components/Table';
import { FloatingButton } from './components/FloatingButton';
import DropdownComponent from './components/DropDown';
import { fetchFeedItem } from './api/fetch/fetchFeedItem';
import { FeedItemForm } from './components/FeedItemForm';
import { HexagonMask } from './components/HexagonMask';
import { getDateArray, getUniqueDateArray, getDateDropdownData } from './utils/Others';
// import homeScreen from './screens/Home';

BASE_PATH_DEVELOPMENT = `http://192.168.1.79:8000/`

const Drawer = createDrawerNavigator()

function HistoryScreen() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [dateSelected, setDateSelected] = useState("");

  const getDropdownUniqueDates = (originalData) => {
    console.log(originalData);
    dateArray = getDateArray(originalData);
    uniqueDataArray = getUniqueDateArray(dateArray)
    return getDateDropdownData(uniqueDataArray);
  }

  // temp data
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => { fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT); }, []);
  // useEffect(() => [...dateDropdownData, {label: }])

  return (
    <View style={styles.container}>
      <DropdownComponent dateData={getDropdownUniqueDates(data)} setDateSelected={setDateSelected} />
      <Table foodItems={data} setFoodItems={setData} requiredDate={dateSelected} />
      <StatusBar style="auto" />
    </View>
  );
}


function HomeScreen() {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Submission form related flag whether is visible
  const [submissionVisible, setSubmissionVisible] = useState(false)

  // Set today's date to display
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => { fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT); }, [submissionVisible])

  return (
    <View style={styles.container}>
      <Table foodItems={data} setFoodItems={setData} requiredDate={todayDate} />
      <FeedItemForm
        isVisible={submissionVisible}
        onClose={() => { setSubmissionVisible(false) }}
        onSubmit={() => {
          setSubmissionVisible(false);
          // fetchFeedItem(setData, setUniqueDates, setIsLoading, BASE_PATH_DEVELOPMENT);
        }}
      />
      <FloatingButton onPress={() => {
        setSubmissionVisible(true);
        // fetchFeedItem(setData, setUniqueDates, setIsLoading, BASE_PATH_DEVELOPMENT);
      }} />
      <StatusBar style="auto" />
    </View>
  );
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
