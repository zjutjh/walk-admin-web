import { request } from "../axios";

interface timeoutListData {
    minute: number,
    route: number,
    type: number,
    secret: string
}

const getTimeoutListFileAPI = (params: timeoutListData) => {
    return request("/admin/timeout/download", {
        method: "GET",
        params: params
    });
};

export default getTimeoutListFileAPI;