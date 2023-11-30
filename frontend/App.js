import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/Home';
import HistoryScreen from './screens/History';
import SettingsScreen from './screens/Settings';
import PlotScreen from './screens/Plots';
import { CustomDrawerContent } from './components/CustomDrawer';

BASE_PATH_DEVELOPMENT = `http://192.168.1.79:8000/`

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      {/* <HexagonMask imageSource={'assets/daisy_navigator.jpeg'} size={200} cornerRadius={10} /> */}

      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => {
        return (
          <CustomDrawerContent {...props} />
        )
      }}>
        <Drawer.Screen name="Today's Feeding" component={HomeScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />
        <Drawer.Screen name="Plots" component={PlotScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
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
  drawerScreen: {
    fontSize: 16,
    fontWeight: "bold",
  }
});
