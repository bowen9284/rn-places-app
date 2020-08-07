import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Button, Text, View, Image, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const ImgPicker = () => {
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
    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
      </View>
      <Button
        title="Take Picture"
        color={Colors.primary}
        onPress={takePictureHandler}
      />
      <Text></Text>
    </View>
  );
};

export default ImgPicker;

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
    width: '100%',
  },
});
