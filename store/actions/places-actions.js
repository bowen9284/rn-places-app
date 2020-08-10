import * as FileSystem from 'expo-file-system';
import { insertPlace } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';

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

      console.log(result);
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
