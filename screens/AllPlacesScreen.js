import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
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
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default AllPlacesScreen;

const styles = StyleSheet.create({});
