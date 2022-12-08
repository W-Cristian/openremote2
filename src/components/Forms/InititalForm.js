import { Fragment, useState } from "react";
import { GetCredentials } from "../../store/logIn-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "../UI/TextInput";

const InitialForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authURL, SetauthURL] = useState("https://localhost/auth");
  const LogIn = async () => {
    if (authURL) {
        navigate("/secured");
        localStorage.setItem("authURL", authURL);
       dispatch(GetCredentials(authURL));
    }
  };

  return (
    <Fragment>
      <h5>
        Please enter the URL where the main Aplication Openremote is running...
      </h5>
      <TextInput
        label="URL from main Openremote App"
        setFunction={SetauthURL}
        value={authURL}
        placeholder="https://localhost/auth"
      />
      <button
        onClick={LogIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 p-1 rounded"
      >LogIn</button>
    </Fragment>
  );
};

export default InitialForm;
