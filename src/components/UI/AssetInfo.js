import { useState } from "react";

const AssetInfo = (props) => {
  const date = new Date(props.item.createdOn);
  const [visibility, setVisibility] = useState(false);
  return (
    <div>
      <div className="flex">
        {visibility && <div className="pl-1 bg-violet-500"></div>}
        <button
          className=" w-full p-2 bg-gradient-to-r from-blue-700 bg-blue-400 text-white hover:bg-slate-400 duration-300"
          onClick={() => setVisibility(!visibility)}
        >
          {props.item.name}
        </button>
      </div>
      {visibility && (
        <div className=" w-full bg-blue-200">
          <ul>
            <li>{props.item.type}</li>
            <li>{props.item.realm}</li>
            <li>{date.toUTCString()}</li>
          </ul>{" "}
        </div>
      )}
    </div>
  );
};

export default AssetInfo;
