import React from 'react';
import { ToucableOpacity, StyleSheet, Image, View } from 'react-native';
import vars from '../env';

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.long}&zoom=14&size=400x200&maptype=roadmap&markers=markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.long}&key=${vars.googleApiKey}`;
  }
  return (
    <View
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image
          style={styles.mapImage}
          source={{
            uri: imagePreviewUrl,
          }}
        />
      ) : (
        props.children
      )}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
