import * as types from '../actions/actionTypes';
export default function propertyImage(state = [], action) {
  // ;
  switch (action.type) {
    case types.IMAGE:
      return [...state, { ...action.files }];
    default:
      return state;
  }
}