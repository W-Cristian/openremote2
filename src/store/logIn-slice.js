import { createSlice } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";
import {FetchData} from "../store/asset-slice";


const uiSlice = createSlice({
  name: "logIn",
  initialState: {
    keycloak: null,
    authenticated: false,
    userInfo: null,
  },
  reducers: {
    updateAuth(state, action) {
      state.keycloak = action.payload.keycloak;
      state.authenticated = action.payload.authenticated;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const GetCredentials = (url) => {
  return async (dispatch) => {
    const keycloak = new Keycloak({
      realm: "master",
      url: url,
      "ssl-required": "none",
      resource: "react",
      clientId: "react",
      "public-client": true,
      "confidential-port": 1,
    });

    const authenticated = await keycloak.init({
      onLoad: "login-required",        
      // onLoad: "check-sso",
      checkLoginIframe: false,
    });

    if (authenticated) {
    localStorage.removeItem("authURL");
      keycloak.loadUserInfo().then((userInfo) =>{
        dispatch(
          uiSlice.actions.updateAuth({
            keycloak: keycloak,
            authenticated: authenticated,
            userInfo: userInfo,
          })
        );
        dispatch(FetchData(keycloak.token));
      }
      );
    }
  };
};

export const logInActions = uiSlice.actions;

export default uiSlice;
