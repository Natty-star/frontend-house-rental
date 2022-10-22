import * as types  from './actionTypes';
export default function addAddressInformation(addressInfo) {
  // ;
  return { type: types.ADDRESS_INFORMATION, addressInfo };
}