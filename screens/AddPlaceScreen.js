import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/actions/places-actions';
import ImagePicker from '../components/ImagePicker';

const AddPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addplace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    console.log('addplace path', imagePath);
    setSelectedImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={() => savePlaceHandler()}
        />
      </View>
    </ScrollView>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
