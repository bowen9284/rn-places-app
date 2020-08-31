import React, { useLayoutEffect, useEffect } from 'react';
import { Text, View, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/actions/places-actions';

const AllPlacesScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            onPress={() => navigation.navigate('AddPlace')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          address={itemData.item.address}
          image={itemData.item.imageUri}
          onSelect={() =>
            navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        ></PlaceItem>
      )}
    />
  );
};

export default AllPlacesScreen;
