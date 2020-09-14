import * as FileSystem from 'expo-file-system';
import { insertPlace, getAllPlaces } from '../../helpers/db';
import { vars } from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addplace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=${vars.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const responseJson = await response.json();
    if (!responseJson.results) {
      throw new Error('Something went wrong');
    }

    const address = responseJson.results[0].formatted_address;
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const result = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.long
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: result.insertId,
          title: title,
          image: image,
          address: address,
          coordinates: {
            lat: location.lat,
            long: location.long,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const result = await getAllPlaces();

      dispatch({
        type: SET_PLACES,
        places: result.rows._array,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
