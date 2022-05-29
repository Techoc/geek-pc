//登录模块
// 登录模块
import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

interface Password {
  mobile: number;
  code: string;
}

class LoginStore {
  public token: String = "";

  constructor() {
    //响应式
    makeAutoObservable(this);
  }

  setToken = async ({ mobile, code }: Password) => {
    //调用登录接口
    let res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    //存入token
    this.token = res.data.token;
  };

  // 登录
}

export default LoginStore;
