import * as types  from './actionTypes';
export default function addPropertyInformation(propertyInfo) {
  // ;
  return { type: types.PROPERTY_INFORMATION, propertyInfo };
}