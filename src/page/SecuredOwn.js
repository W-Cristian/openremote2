import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCredentials } from "../store/logIn-slice";
import {FetchData} from "../store/asset-slice";
import SelectorInput from "../components/UI/SelectorInput";
import AssetFormNetatmo from "../components/Forms/AssetFormNetatmo";
import AssetFormOther from "../components/Forms/AssetFormOther";

const SecuredOwn = () => {
  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.logIn.authenticated);
  const user = useSelector((state) => state.logIn.keycloak);

  const formularSelector = ["netatmo", "other"]
  const [formular,setFormular] = useState(formularSelector[0]);

   const LogIn = async () => {
    dispatch(GetCredentials());
   };

// useEffect(()=>{
//   dispatch(GetCredentials())}
// ,[dispatch]);


// useEffect(() => {
//   dispatch(fetchCartData());
// }, [dispatch]);

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
        {/* <p>
          This is a Keycloak-secured component of your application. You
          shouldn't be able to see this unless you've authenticated with
          Keycloak.
        </p> */}
        <button onClick={dataHandler} className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 p-1 rounded">
          Fetch Data
        </button>
        <div className="grid grid-cols-1 place-items-center ">
          
          <div className="my-7 w-96">
            <SelectorInput label="Formular Selector" options={formularSelector} handle={HandleFormularSelector} noRequired={true}/>
          </div>
          {(formular === formularSelector[0]) && <AssetFormNetatmo/>}
          {(formular === formularSelector[1]) && <AssetFormOther/>}
        </div>
      </div>
    );
  else
    return (
      <Fragment>
        <div>Unable to authenticate!</div>
        <button
          onClick={LogIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 p-1 rounded"
        >
          LogIn
        </button>
      </Fragment>
    );
};

export default SecuredOwn;
