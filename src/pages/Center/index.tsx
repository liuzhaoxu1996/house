import { connect } from "react-redux";
import { logout } from "../../utils/session";

const Center = (props: any) => {
  const { history, userInfo } = props;
  const handleLogout = () => {
    logout();
    history.replace("/login");
  };
  return (
    <div>
      <h1>Center</h1>
      <div>
        <div>姓名：{userInfo.username}</div>
        <div>年龄：{userInfo.age}</div>
        <div>手机号：{userInfo.phone}</div>
      </div>
      <div>
        <button onClick={handleLogout}>退出</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userInfo: state.login
  };
};

export default connect(mapStateToProps)(Center);
