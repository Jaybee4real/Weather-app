import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import Home from './src/screens/Home.js';
import Search from './src/screens/Search';
import { useFonts } from 'expo-font';
import Loading from './src/Components/Loading';

const Stack = createStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    "Raleway-300": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-400": require("./assets/fonts/Raleway-Regular.ttf"),
    "Raleway-500": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-600": require("./assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-700": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-800": require("./assets/fonts/Raleway-ExtraBold.ttf"),
    "Raleway-900": require("./assets/fonts/Raleway-Black.ttf"),
  });

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, /// //Can Be Changed
          }}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
