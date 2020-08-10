export const ADD_PLACE = 'ADD_PLACE';
import * as FileSystem from 'expo-file-system';

export const addplace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch({ type: ADD_PLACE, placeData: { title: title, image: image } });
  };
};
