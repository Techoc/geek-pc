import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class ChannelStore {
    public channelList = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadChannelList = async () => {
        let res = await http.get("/channels");
        this.channelList = res.data.channels;
    };
}

export default ChannelStore;
