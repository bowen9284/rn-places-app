import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllPlacesScreen from './screens/AllPlacesScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import PlaceDetailScreen from './screens/PlaceDetailScreen';
import ViewMapScreen from './screens/ViewMapScreen';
import Colors from './constants/Colors';
import placesReducer from './store/reducers/places-reducer';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Initialized Database');
  })
  .catch((error) => {
    console.log('Initializing Database failed.');
    console.log(error);
  });

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="All Places"
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.primary,
            },
            headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white',
          }}
        >
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
    </Provider>
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
