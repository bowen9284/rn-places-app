import { ADD_PLACE, SET_PLACES } from '../actions/places-actions';
import Place from '../../models/place';

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.lat,
        action.placeData.long
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id,
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.long
            )
        ),
      };
    default:
      return state;
  }
};
