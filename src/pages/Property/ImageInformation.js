import * as React from "react";

import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from "@mui/material/Button";
import addImage from "../../redux/actions/addImageAction";
export default function ImageInformation() {
  const dispatch = useDispatch();
  let [Files, setFiles] = useState([]);

  let handleChange = (e) => {
    setFiles([]);
    for(let i = 0; i < e.target.files.length; i++){
      Files.push({

        Attachement: e.target.files[i]

      })
    }

    dispatch(addImage(Files));
  }


  return (
    <div className="form-inline u-margin-huge">
      <div className="row mb-2">
        <div className="col-md-10">
          <label htmlFor="formFileMultiple" className="form-label">
            Property Images
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
}
