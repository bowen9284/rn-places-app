import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllPlacesScreen from './screens/AllPlacesScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import PlaceDetailScreen from './screens/PlaceDetailScreen';
import ViewMapScreen from './screens/ViewMapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="All Places">
        <Stack.Screen
          name="AllPlaces"
          component={AllPlacesScreen}
          options={{ title: 'All Places' }}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlaceScreen}
          options={{ title: 'Add Place' }}
        />
        <Stack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={{ title: 'Details' }}
        />
        <Stack.Screen
          name="ViewMap"
          component={ViewMapScreen}
          options={{ title: 'Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});