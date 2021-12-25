import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
         name="Prognoza pogody" 
         component={HomeScreen} 
         options={{
          headerStyle: {
            backgroundColor: '#1B1725'
          },
              headerTintColor: '#fff'
          }} 
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}