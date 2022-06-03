// 用户模块
import {makeAutoObservable} from "mobx";
import {http} from "@/utils";

class UserStore {
    userInfo = {
        name: "123"
    };

    constructor() {
        makeAutoObservable(this);
    }

    getUserInfo = async () => {
        //调用接口获取信息
        const res = await http.get("/user/profile");
        this.userInfo = res.data;
    };
}

export default UserStore;
