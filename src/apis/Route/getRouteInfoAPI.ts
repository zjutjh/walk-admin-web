import { request } from "../axios";

interface routeData {
    secret: string
}

const getRouteInfoAPI = (params: routeData) => {
    return request("/admin/detail", {
        method: "GET",
        params: params
    });
};

export default getRouteInfoAPI;