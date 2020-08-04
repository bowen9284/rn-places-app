import React, { useLayoutEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

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

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default AllPlacesScreen;
