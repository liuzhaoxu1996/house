import storage from "./storage";

const AUTH_COOKIE_NAME = "sessionId";

const _getCookie = (name: string) => {
  const cookies = document.cookie;
  const map = new Map();
  if (cookies.length > 0 && cookies.indexOf(name) > -1) {
    const cookieKeyValueArr = cookies.split(";");
    cookieKeyValueArr.forEach((keyValue) => {
      const [key, value] = keyValue.split("=");
      map.set(key.trim(), value.trim());
    });
    return map.get(name) || "";
  }
  return "";
};

const _setCookie = (name: string, value: string, expire: number = 0) => {
  let date: any = new Date();
  const expireDate = date.getDate() + expire;
  date.setDate(expireDate);
  document.cookie = `${name}=${value};path=/;${expire ? date.toGMTString() : ""
    }`;
};

export const isAuthenticated = () => {
  return _getCookie(AUTH_COOKIE_NAME);
};

export const getAuthorization = () => {
  return _getCookie(AUTH_COOKIE_NAME);
};

export const authenticatedSuccess = (token: string) => {
  _setCookie(AUTH_COOKIE_NAME, token);
};

export const logout = () => {
  _setCookie(AUTH_COOKIE_NAME, "");
  storage.clear();
};
