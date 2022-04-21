import Cookies from "universal-cookie";

const cookies = new Cookies();
export class AuthHandler {
  static setToken(token) {
    return cookies.set("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  static getToken() {
    return cookies.get("token");
  }

  static removeToken() {
    return cookies.remove("token");
  }
}
