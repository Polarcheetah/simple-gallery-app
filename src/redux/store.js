import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialGalleryState, initialState } from './initialState';

//selectors
// export const getThreePhotos = (state,indexOfPhoto) => {
//   const threePhotos = [];
//   if (indexOfPhoto >= 0 && indexOfPhoto <= 2){
//       threePhotos.push(state.photos.data[indexOfPhoto])
//   }
// };

//actions
const createActionName = (actionName) => `app/gallery/${actionName}`;
const FETCH_START = createActionName('FETCH_START');
const PHOTOS_DOWNLOAD = createActionName('PHOTOS_DOWNLOAD');
const FETCH_ERROR = createActionName('FETCH_ERROR');

//action creators
const fetchStart = (payload) => ({ type: FETCH_START, payload });
const downloadPhotos = (payload) => ({ type: PHOTOS_DOWNLOAD, payload });
const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export const fetchPhotos = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch('https://picsum.photos/v2/list')
      .then((res) => res.json())
      .then((photos) => dispatch(downloadPhotos(photos)))
      .catch((error) => {
        dispatch(fetchError(error.message || true));
      });
  };
};

const reducer = (state = initialGalleryState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        photos: {
          ...state.photos,
          status: { error: false, loading: true },
        },
      };
    case PHOTOS_DOWNLOAD:
      return {
        photos: {
          ...state.photos,
          status: { error: false, loading: false },
          data: action.payload,
        },
      };
    case FETCH_ERROR:
      return {
        photos: {
          ...state.photos,
          status: { error: true, loading: false },
        },
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
export default store;
