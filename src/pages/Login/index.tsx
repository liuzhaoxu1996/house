import { useState } from "react";
import { connect } from "react-redux";
import http from "../../api/request";

const Login = (props: any) => {
  let [username, setUsername] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [loading, setLoading] = useState<string>("");

  const handleLogin = () => {
    const { history, loginRequest, loginSuccess, loginFail } = props;
    loginRequest();
    setLoading("正在登录...");
    const data = { username, password };
    http("post", "/login", {}, data)
      .then((res) => {
        const data = res.data;
        loginSuccess(data);
        setLoading("登录成功");
        setTimeout(() => {
          history.push("/home");
        }, 200);
      })
      .catch((e) => {
        loginFail(e);
        setLoading("登录失败, " + e);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!username || !password) {
      alert("请输入用户名和密码");
      return;
    }
    handleLogin();
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>登 录</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="please input username"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="please input password"
        />
        <br />
        <div>
          <p>用户名：admin</p>
          <p>密码：111111</p>
        </div>
        <button type="submit">登 录</button>
        <div>{loading}</div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginRequest: () => dispatch({ type: "LOGIN_REQUEST" }),
    loginSuccess: (data: any) =>
      dispatch({ type: "LOGIN_SUCCESS", payload: data }),
    loginFail: (msg: any) => dispatch({ type: "LOGIN_FAIL", payload: msg })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
