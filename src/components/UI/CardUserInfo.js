const CardUserInfo = (props) => {

    return (
        <div className="UserInfo">
          <p>Name: {props.userInfo.name}</p>
          <p>Email: {props.userInfo.email}</p>
          <p>ID: {props.userInfo.sub}</p>
        </div>
      );

}

export default CardUserInfo;

