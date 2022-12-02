import Keycloak from "keycloak-js";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../UI/TextInput";
import SelectorInput from "../UI/SelectorInput";
const AssetFormOther = () => {
  const user = useSelector((state) => state.logIn.keycloak);
  const assetName = useRef();
  const realm = useRef();
  const [typeOfMeasure, SetTypeOfMeasure] = useState("temperature");

  // Type of data to be returned.
  // Temperature data (°C) = {temperature, min_temp, max_temp, date_min_temp, date_max_temp}
  // Humidity data (%) = {humidity, min_hum, max_hum, date_min_hum, date_max_hum}
  // CO2 data (ppm) = {co2, min_co2, max_co2, date_min_co2, date_max_co2}
  // Pressure data (bar) = {pressure, min_pressure, max_pressure, date_min_pressure, date_max_pressure}
  // Noise data (db) = {noise, min_noise, max_noise, date_min_noise, date_max_noise}
  // Rain data (mm) = {rain, min_rain, max_rain, sum_rain, date_min_rain, date_max_rain}
  // Wind data (km/h, °) = {windstrength, windangle, guststrength, gustangle, date_min_gust, date_max_gust}
  const typeOfMeasures = [
    "temperature",
    "humidity",
    "co2",
    "pressure",
    "noise",
    "rein",
    "windstrength",
    "windangle",
    "guststrength",
    "gustangle",
    "min_temp",
    "max_temp",
    "min_hum",
    "max_hum",
    "min_co2",
    "max_co2",
    "min_pressure",
    "max_pressure",
    "min_noise",
    "max_noise",
    "min_rain",
    "max_rain",
    "sum_rain",
    "date_min_temp",
    "date_max_temp",
    "date_min_hum",
    "date_max_hum",
    "date_min_co2",
    "date_max_co2",
    "date_min_pressure",
    "date_max_pressure",
    "date_min_noise",
    "date_max_noise",
    "date_min_rain",
    "date_max_rain",
    "date_min_gust",
    "date_max_gust",
  ];

  const [scale, SetScale] = useState("30min");
  // Timeframe between two measurements
  //{30min, 1hour, 3hours, 1day, 1week, 1month}
  const typeOfScale = ["30min", "1hour", "3hours", "1day", "1week", "1month"];

  const setHandler = (event) => {
    event.preventDefault();
    user
      .updateToken(30)
      .then(function () {
        sendAsset(user.token);
      })
      .catch(function () {
        alert("Failed to refresh token");
      });
  };

  const sendAsset = function (token) {
    const url = "https://localhost/api/master/asset?name=test&realm=master";

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
          alert("Set asset Success");
        } else if (req.status === 403) {
          alert("Set asset Forbidden");
        }
      }
    };

    const msm = {
      name: assetName.current.value,
      type: "HTTPAgent",
      realm: realm.current.value,
      attributes: {
        requestQueryParameters: {
          name: "requestQueryParameters",
          type: "multivaluedTextMap",
          value: {
            device_id: ["70:ee:50:65:31:28"],
            scale: ["1day"],
            type: [{ typeOfMeasure }],
          },
        },
        notes: {
          name: "notes",
          type: "text",
        },
        agentDisabled: {
          name: "agentDisabled",
          type: "boolean",
        },
        requestTimeoutMillis: {
          name: "requestTimeoutMillis",
          type: "positiveInteger",
        },
        followRedirects: {
          name: "followRedirects",
          type: "boolean",
        },
        agentStatus: {
          name: "agentStatus",
          type: "connectionStatus",
          meta: {
            readOnly: true,
          },
        },
        baseURL: {
          name: "baseURL",
          value: "https://api.netatmo.com/api/getmeasure",
          type: "HTTP_URL",
        },
        requestHeaders: {
          name: "requestHeaders",
          type: "multivaluedTextMap",
        },
        location: {
          name: "location",
          type: "GEO_JSONPoint",
        },

        oAuthGrant: {
          type: "oAuthGrant",
          value: {
            grant_type: "password",
            password: "password",
            username: "username",
            client_secret: "client_secret",
            client_id: "YOUR_APP_ID",
            scope: "SCOPE_SPACE_SEPARATED",
          },
          name: "oAuthGrant",
        },
      },
    };
    req.send(JSON.stringify(msm));
  };

  const HandleTypeOfMeasure = (e) => {
    SetTypeOfMeasure({ selectedValue: e.target.value });
  };

  const HandleTypeOfScale = (e) => {
    SetScale({ selectedValue: e.target.value });
  };

  return (
    <form onSubmit={setHandler}>
      <div className="grid grid-cols-1 divide-y divide-blue-500 min-w-fit w-96 flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
        <div>
          <p className="font-bold sm my-5">Asset Info</p>
          <TextInput label="Asset Name" reference={assetName} />
          <TextInput label="Realm" value="master" reference={realm} />
        </div>


        <div>
        <p className="font-bold sm my-5">Http Api other parameters</p>
          <TextInput label="device_id" placeholder="e.g 70:ee:50:65:xx:xx" />

        </div>
        <div>
          <button className="mt-5 w-full border p-2 bg-gradient-to-r from-blue-700 bg-blue-400 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300">
            Set Asset
          </button>
        </div>
      </div>
    </form>
  );
};
export default AssetFormOther;
