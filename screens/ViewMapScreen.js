import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const ViewMapScreen = ({ navigation, route }) => {
  const initialLocation = route.params?.initialLocation;
  const readOnly = route.params?.readOnly;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  useLayoutEffect(() => {
    if (readOnly) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => saveLocationHander()}
        >
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  });

  const saveLocationHander = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('Oops!', 'Please select a location');
      return;
    }
    navigation.navigate('AddPlace', { selectedLocation: selectedLocation });
  }, [selectedLocation]);

  const selectLocationHandler = (event) => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      long: event.nativeEvent.coordinate.longitude,
    });
  };

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.long,
    };
  }

  return (
    <MapView
      region={mapRegion}
      style={styles.mapStyle}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
});

export default ViewMapScreen;
