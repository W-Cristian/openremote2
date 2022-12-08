import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCredentials } from "../store/logIn-slice";
import {FetchData} from "../store/asset-slice";
import SelectorInput from "../components/UI/SelectorInput";
import AssetFormNetatmo from "../components/Forms/AssetFormNetatmo";
import AssetFormGardena from "../components/Forms/AssetFormGardena";
import { useNavigate } from "react-router-dom";

const SecuredOwn = () => {
  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.logIn.authenticated);
  const user = useSelector((state) => state.logIn.keycloak);
  const navigate = useNavigate();

  const formularSelector = ["netatmo", "gardena"]
  const [formular,setFormular] = useState(formularSelector[0]);
  const authURL = localStorage.getItem("authURL");

   const LogIn = async () => {
   if (authURL) {
    dispatch(GetCredentials(authURL));
    }};

    const NavigateReturn = () =>{
      navigate('/');
    }

  const dataHandler = () => {
    user.updateToken(30)
      .then(function () {
        dispatch(FetchData(user.token));
      })
      .catch(function () {
        alert("Failed to refresh token");
      });
  };

  const HandleFormularSelector = (e) => {
    setFormular( e.target.value );
  };

  if (auth)
    return (
      <div className="my-10">
        <button onClick={dataHandler} className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 p-1 rounded">
          Fetch Assets
        </button>
        <div className="grid grid-cols-1 place-items-center ">
          
          <div className="my-7 w-96">
            <SelectorInput label="Formular Selector" options={formularSelector} handle={HandleFormularSelector} noRequired={true}/>
          </div>
          {(formular === formularSelector[0]) && <AssetFormNetatmo/>}
          {(formular === formularSelector[1]) && <AssetFormGardena/>}
        </div>
      </div>
    );
  else{
      if (authURL) {
        return (
          <Fragment>
            <div>Please confirm to recive a access token</div>
            <button
              onClick={LogIn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 p-1 rounded"
            >
              Confirm
            </button>
          </Fragment>
        );
      }
      else{
        return (
          <Fragment>
            <div>Unable to authenticate! check URL Again</div>
            <button
              onClick={NavigateReturn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 p-1 rounded"
            >
              Return
            </button>
          </Fragment>
        );
      }


  }

};

export default SecuredOwn;
