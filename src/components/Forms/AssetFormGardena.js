import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../UI/TextInput";
import { SendAsset } from "../../store/asset-slice";
import SelectorInput from "../UI/SelectorInput";
const AssetFormGardena = () => {
  const user = useSelector((state) => state.logIn.keycloak);
  const [typeOfMeasure, SetTypeOfMeasure] = useState("temperature");

  // Type of data to be returned.

  const typeOfMeasures = [
    "temperature",
    "humidity",
  ];

  const [assetName, SetassetName] = useState("react-gardena");
  const [realm, Setrealm] = useState("master");
  const [locationId, SetlocationId] = useState("");
  const [apiURL, SetapiURL] = useState("https://api.smart.gardena.dev/v1");

  const FillJson = function(locationId,typeOfMeasure) {
    var requestQueryParameters={};
    if (locationId.trim() !== ""){locationId.locationId=[locationId];}
    if (typeOfMeasure.trim() !== ""){requestQueryParameters.type=[typeOfMeasure];}
    return requestQueryParameters;
   };



const setHandler = (event) => {
    event.preventDefault();
    user
      .updateToken(30)
      .then(async function () {
          var returnObj = null;

          // var oAuthGrant_password ={
          //   grant_type:grant_type ,
          //   password:password ,
          //   username:username ,
          //   client_secret:client_secret ,
          //   client_id:client_id ,
          //   scope:scope ,
          //   tokenEndpointUri:"https://api.netatmo.com/oauth2/token",
          // };

          var requestheader =
            {
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

              // oAuthGrant: {
              //   type: "oAuthGrant",
              //   name: "oAuthGrant",
              //   value: oAuthGrant_password
              //   },

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
                value: apiURL,
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
          // console.log("httpagent",HTTPagent );

          if (returnObj) {
            var queryParameters= FillJson(locationId,typeOfMeasure);
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
                          messageConvertBinary: false,
                          messageConvertHex: false,
                          type: "HTTPAgentLink"
                      },
                      readOnly: true
                  },
              },
              location: {
                  type: "GEO_JSONPoint",
                  value: null,
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
            // console.log("WeatherAsset",WeatherAsset );
          }
      })
      .catch(function () {
        alert("Failed to refresh token");
      });
  };

  const HandleTypeOfMeasure = (e) => {
    SetTypeOfMeasure({ selectedValue: e.target.value });
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
        <p className="font-bold sm my-5">Http Api other parameters</p>
          <TextInput label="api - URL" setFunction={SetapiURL} value={apiURL} />
          <TextInput label="locationId" setFunction={SetlocationId} value={locationId} placeholder="e.g 6082e957-891a-480d-9fa2-196faed4b5eb" />
          <SelectorInput label="Type Of Measure" options={typeOfMeasures} handle={HandleTypeOfMeasure}/>
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
export default AssetFormGardena;
