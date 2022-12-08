import { useSelector } from "react-redux";
import CardUserInfo from "../UI/CardUserInfo";

const MainHeader = () => {
 const userInfo = useSelector((state) => state.logIn.userInfo);
  return (
      <div className="bg-gradient-to-r from-blue-600 bg-blue-500 flex p-6 h-48 shadow-sm">
        <h6 className="flex-grow text-2xl font-bold">Open Remote</h6>
        {userInfo &&<CardUserInfo userInfo={userInfo}/>}

      </div>
  );
};

export default MainHeader;
