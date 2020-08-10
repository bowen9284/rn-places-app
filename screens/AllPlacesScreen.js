import React, { useLayoutEffect } from 'react';
import { Text, View, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const AllPlacesScreen = ({ navigation }) => {
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

  const places = useSelector((state) => state.places.places);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          address={null}
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
