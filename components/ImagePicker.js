import React, { useState } from 'react';
import * as ExpoImagePicker from 'expo-image-picker';
import { StyleSheet, Button, Text, View, Image, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const ImagePicker = ({ onImageTaken }) => {
  const [image, setImage] = useState();

  const verifyPermissions = async () => {
    if (Constants.platform.ios) {
      const result = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      if (result.status !== 'granted') {
        Alert.alert(
          'Insufficient permissions!',
          'We need camera permissions to make this work!',
          [{ text: 'Okay' }]
        );
      }
      return false;
    }
    return true;
  };

  const takePictureHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const chosenImage = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(chosenImage.uri);
    onImageTaken(chosenImage.uri);
  };

  const imageContainer = !image ? (
    <Text>No image picked yet.</Text>
  ) : (
    <Image source={{ uri: image }} style={styles.image} />
  );

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>{imageContainer}</View>
      <Button
        title="Take Picture"
        color={Colors.primary}
        onPress={takePictureHandler}
      />
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ImagePicker;
