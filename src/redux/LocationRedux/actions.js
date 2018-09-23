import { makeActionCreator } from '../../utils/reduxUtils';

export const Types = {
  MAP_LOCATION_REQUEST: 'MAP_LOCATION_REQUEST',
  MAP_LOCATION_RECEIVE: 'MAP_LOCATION_RECEIVE',
  MAP_LOCATION_FAILURE: 'MAP_LOCATION_FAILURE',
};

export const requestLocation = () => makeActionCreator(Types.MAP_LOCATION_REQUEST);
export const receiveLocation = (latitude, longitude, location) => makeActionCreator(Types.MAP_LOCATION_RECEIVE, { latitude, longitude, location });
export const receiveLocationFailure = errorCode => makeActionCreator(Types.MAP_LOCATION_FAILURE, { errorCode });

export default {
  requestLocation,
  receiveLocation,
  receiveLocationFailure,
};
