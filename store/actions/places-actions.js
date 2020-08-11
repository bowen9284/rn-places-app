import * as FileSystem from 'expo-file-system';
import { insertPlace, getAllPlaces } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addplace = (title, image) => {
  return async (dispatch) => {
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
        'placeholder address',
        15.6,
        12.3
      );

      dispatch({
        type: ADD_PLACE,
        placeData: { id: result.insertId, title: title, image: image },
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
      console.log('db', result);

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
