import { createSlice } from "@reduxjs/toolkit";

const assetSlice = createSlice({
  name: "asset",
  initialState: {assets:[]},
  reducers: {
    updateAsset(state, action) {
      state.assets = action.payload;
    }
  },
});

export const FetchData = (token) => {
  return async (dispatch) => {
      const url = "https://localhost/api/master/asset/query";
  
      const req = new XMLHttpRequest();
      req.open("POST", url, true);
      req.setRequestHeader("Accept", "*/*");
      req.setRequestHeader("Authorization", "Bearer " + token);
      req.setRequestHeader("Access-Control-Allow-Origin", "https://localhost/");
      req.setRequestHeader(
        "Access-Control-Allow-Headers",
        "content-encoding, date, content-length, Origin, Content-Type"
      );
      req.setRequestHeader("content-type", "application/json; charset=utf8");
  
      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) {
            var obj = JSON.parse(req.responseText);
            dispatch(
              assetSlice.actions.updateAsset(obj)
            );
          } else if (req.status === 403) {
            alert("Forbidden");
          }
        }
      };
      req.send('{"select":{"attributes":[]}}');
    };
  };


  export const SendAsset = function (token,JSONobj) {
    return new Promise(function (resolve, reject) {
    const url = "https://localhost/api/master/asset";

    const req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Accept", "*/*");
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.setRequestHeader("Access-Control-Allow-Origin", "https://localhost/");
    req.setRequestHeader(
      "Access-Control-Allow-Headers",
      "content-encoding, date, content-length, Origin, Content-Type"
    );
    req.setRequestHeader("content-type", "application/json; charset=utf8");

    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          var resposeObj = JSON.parse(req.responseText);
          resolve(resposeObj);
          
          alert(`Set asset ${JSONobj.name} of type ${JSONobj.type} in realm ${JSONobj.realm} Success`);
        } else if (req.status === 403) {
          reject(alert("Set asset Forbidden"));
        }
      }
    };
     req.send(JSON.stringify(JSONobj));
  })};


export const assetActions = assetSlice.actions;

export default assetSlice;
