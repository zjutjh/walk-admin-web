import { request } from "../axios";

interface timeoutListData {
    minute: number,
    route: number,
    type: number,
    secret: string
}

const getTimeoutListAPI = (params: timeoutListData) => {
    return request("/admin/timeout", {
        method: "GET",
        params: params
    });
};

export default getTimeoutListAPI;