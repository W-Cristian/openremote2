import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../UI/TextInput";
import SelectorInput from "../UI/SelectorInput";
import { SendAsset } from "../../store/asset-slice";

const AssetFormNetatmo = () => {
  const user = useSelector((state) => state.logIn.keycloak);

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
  const [typeOfMeasure, SetTypeOfMeasure] = useState(typeOfMeasures[0]);

  // Timeframe between two measurements
  //{30min, 1hour, 3hours, 1day, 1week, 1month}
  const typeOfScale = ["30min", "1hour", "3hours", "1day", "1week", "1month"];
  const [scale, SetScale] = useState(typeOfScale[0]);

  const [assetName, SetassetName] = useState("react-Oauth");
  const [realm, Setrealm] = useState("master");

  const [client_id, Setclient_id] = useState("638894f1bcb7b68a9d05843c");
  const [client_secret, Setclient_secret] = useState("YGVCWbrPNTwDHDoXTGBJXljzkGaxuUOkqigmKtNvM3ffx");
  const [scope, Setscope] = useState("read_station");
  const [grant_type, Setgrant_type] = useState("password");
  const [username, Setusername] = useState("markus_fl@web.de");
  const [password, Setpassword] = useState("sXLmt6B.zRSvwU-");
  const [device_id, Setdevice_id] = useState("70:ee:50:65:31:28");
  const [module_id, Setmodule_id] = useState("");
  const [date_begin, Setdate_begin] = useState("");
  const [date_end, Setdate_end] = useState("");
  const [limit, Setlimit] = useState("10");
  

  const FillJson = function(device_id,module_id,scale,typeOfMeasure,date_begin,date_end,limit) {
    var requestQueryParameters={};
    if (device_id.trim() !== ""){requestQueryParameters.device_id=[device_id];}
    if (module_id.trim() !== ""){requestQueryParameters.module_id=[module_id];}
    if (scale.trim() !== ""){requestQueryParameters.scale=[scale];}
    if (typeOfMeasure.trim() !== ""){requestQueryParameters.type=[typeOfMeasure];}
    if (date_begin.trim() !== ""){requestQueryParameters.date_begin=[date_begin];}
    if (date_end.trim() !== ""){requestQueryParameters.date_end=[date_end];}
    if (limit.trim() !== ""){requestQueryParameters.limit=[limit];}
    return requestQueryParameters;
   };


  const setHandler = (event) => {
    event.preventDefault();
    user
      .updateToken(30)
      .then(async function () {
          var returnObj = null;

          //parameter works only for    grant_type:"password"  seee documentation openremote
          var oAuthGrant_password ={
            grant_type:grant_type ,
            password:password ,
            username:username ,
            client_secret:client_secret ,
            client_id:client_id ,
            scope:scope ,
            tokenEndpointUri:"https://api.netatmo.com/oauth2/token",
          };

          var requestheader =
            {
            // authorization: [
            //   "Bearer 62e1a1905b4d01169d0fc3a9|cbf44e3db5459e39a530d27db638a527"
            // ],
            accept: [
              "application/json"
            ]
          };
          
          // parameters to ask data for api see docu ----->>> https://dev.netatmo.com/apidocumentation/weather

          const HTTPagent = {
            name: assetName,
            type: "HTTPAgent",
            realm: realm,
            attributes: 
            {
              requestQueryParameters :{
                name: "requestQueryParameters",
                type: "multivaluedTextMap"},

              oAuthGrant: {
                type: "oAuthGrant",
                name: "oAuthGrant",
                value: oAuthGrant_password
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
                value: "https://api.netatmo.com/api/",
                type: "HTTP_URL",
              },
              requestHeaders: {
                name: "requestHeaders",
                type: "multivaluedTextMap",
                value: requestheader,
              },
              location: {
                name: "location",
                type: "GEO_JSONPoint",
              },
            },
          };
          returnObj = await SendAsset(user.token,HTTPagent);
          console.log("httpagent",HTTPagent );

          if (returnObj) {
            var queryParameters= FillJson(device_id,module_id,scale,typeOfMeasure,date_begin,date_end,limit);
            const WeatherAsset = {
            name: "humidity",
            type: "WeatherAsset",
            realm: realm,
            parentId: returnObj.id,
            attributes: 
            {
              sunIrradiance: {
                  type: "positiveNumber",
                  value: null,
                  name: "sunIrradiance",
                  meta: {
                      readOnly: true
                  },
              },
              rainfall: {
                  type: "positiveNumber",
                  value: null,
                  name: "rainfall",
                  meta: {
                      readOnly: true
                  },
              },
              notes: {
                  type: "text",
                  value: null,
                  name: "notes",
              },
              uVIndex: {
                  type: "positiveNumber",
                  value: null,
                  name: "uVIndex",
                  meta: {
                      readOnly: true,
                      label: "UV index"
                  },
              },
              sunAzimuth: {
                  type: "positiveNumber",
                  value: null,
                  name: "sunAzimuth",
                  meta: {
                      readOnly: true
                  },
              },
              temperature: {
                  type: "number",
                  value: null,
                  name: "temperature",
                  meta: {
                      readOnly: true
                  },
              },
              humidity: {
                  type: "positiveInteger",
                  value: null,
                  name: "humidity",
                  meta: {
                      agentLink: {
                          id: returnObj.id,
                          valueFilters: [
                              {
                                  type: "jsonPath",
                                  path: "$.body.[0].value.[8]",
                                  returnFirst: true,
                                  returnLast: false
                              }
                          ],
                          queryParameters: queryParameters,
                          pollingMillis: 10000,
                          path: "getmeasure",
                          messageConvertBinary: false,
                          messageConvertHex: false,
                          type: "HTTPAgentLink"
                      },
                      readOnly: true
                  },
              },
              location: {
                  type: "GEO_JSONPoint",
                  value: {
                      coordinates: [
                          6.536820846557987,
                          51.486908980181994
                      ],
                      type: "Point"
                  },
                  name: "location",
              },
              windDirection: {
                  type: "direction",
                  value: null,
                  name: "windDirection",
                  meta: {
                      "readOnly": true
                  },
              },
              windSpeed: {
                  type: "positiveNumber",
                  value: null,
                  name: "windSpeed",
                  meta: {
                      readOnly: true
                  },
              },
              sunAltitude: {
                  type: "positiveNumber",
                  value: null,
                  name: "sunAltitude",
                  meta: {
                      "readOnly": true
                  },
              },
              sunZenith: {
                  type: "positiveNumber",
                  value: null,
                  name: "sunZenith",
                  meta: {
                      "readOnly": true
                  },
              }
          }
            };
            returnObj = SendAsset(user.token,WeatherAsset);
            console.log("WeatherAsset",WeatherAsset );
          }
      })
      .catch(function () {
        alert("Failed to refresh token");
      });
  };

  const HandleTypeOfMeasure = (e) => {
    SetTypeOfMeasure({ selectedValue: e.target.value });
  };

  const HandleTypeOfScale = (e) => {
    SetScale({ selectedValue: e.target.value });
  };

  return (
    <form onSubmit={setHandler}>
      <div className="grid grid-cols-1 divide-y divide-blue-500 min-w-fit w-96 flex-col border bg-white px-6 py-5 shadow-md rounded-[4px] mb-12">
        <div>
          <p className="font-bold sm my-5">Asset Info</p>
          <TextInput label="Asset Name" setFunction={SetassetName} value={assetName} />
          <TextInput label="Realm" setFunction={Setrealm} value={realm} />
        </div>
        <div>
          <p className="font-bold sm my-5">Http Netatmo Api Info</p>
          <TextInput label="client_id" setFunction={Setclient_id} value={client_id} />
          <TextInput label="client_secret" setFunction={Setclient_secret} value={client_secret} noRequired={true} />
          <TextInput label="scope" setFunction={Setscope} value={scope} noRequired={true} />
          <TextInput label="grant_type" setFunction={Setgrant_type} value={grant_type} />
          <TextInput label="username" setFunction={Setusername} value={username}  placeholder="e.g. peter@zoller.com"/>
          <TextInput label="password" setFunction={Setpassword} value={password}  />
        </div>

        <div>
        <p className="font-bold sm my-5">Http Netatmo Api Parameters</p>
          <TextInput label="device_id" setFunction={Setdevice_id} value={device_id} placeholder="e.g 70:ee:50:65:xx:xx" />
          <TextInput label="module_id" setFunction={Setmodule_id} value={module_id} placeholder="e.g 70:ee:50:65:xx:xx" noRequired={true} />
          <SelectorInput label="Type Of Measure" options={typeOfMeasures} handle={HandleTypeOfMeasure}/>
          <SelectorInput label="Scale" options={typeOfScale} handle={HandleTypeOfScale}/>
          <TextInput label="date_begin" setFunction={Setdate_begin} value={date_begin} noRequired={true} placeholder="e.g. 1459265427"/>
          <TextInput label="date_end" setFunction={Setdate_end} value={date_end} noRequired={true} placeholder="e.g. 2459265427"/>
          <TextInput label="limit" setFunction={Setlimit} value={limit} noRequired={true} placeholder="e.g. 1024"/>
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
export default AssetFormNetatmo;
