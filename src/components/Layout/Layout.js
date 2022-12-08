import { Fragment } from "react";
import { useSelector } from "react-redux";
import MainHeader from "./MainHeader";
import AssetInfo from "../UI/AssetInfo";

const Layout = (props) => {
const asset = useSelector((state) => state.asset.assets);
  return (
    <Fragment>
      <MainHeader />
       <div className="flex h-screen ">
         <div className="w-64 bg-slate-50 h-max">
          {asset.length > 0 && <h6 className="font-bold mb-4">Assets Found</h6>}
          <ul>
            {asset.map((item) => (
               <li key={item.id} className="mb-2"><AssetInfo item={item}/></li>
            ))}
          </ul>
        </div>
        <div className="p-6 w-full">
          <div>{props.children}</div>
        </div>
      </div>

    </Fragment>
  );
};

export default Layout;
