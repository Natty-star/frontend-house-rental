import { combineReducers } from 'redux';
import propertyInformation from './propertyInformationReducer';
import addressInformation from './addressInformationReducer';
import propertyImage from './ImageReducer';

const appReducer = combineReducers({
    propertyInformation,
    addressInformation,
    propertyImage
});
export default appReducer ;