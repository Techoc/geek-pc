//登录模块
// 登录模块
import { makeAutoObservable } from "mobx";
import { getToken, http, removeToken, setToken } from "@/utils";

interface Password {
  mobile: number;
  code: string;
}

class LoginStore {
  public token: string = getToken() || "";

  constructor() {
    //响应式
    makeAutoObservable(this);
  }

  login = async ({ mobile, code }: Password) => {
    //调用登录接口
    let res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    //存入token
    this.token = res.data.token;
    setToken(this.token);
  };

  logout = () => {
    this.token = "";
    removeToken();
  };
}

export default LoginStore;
