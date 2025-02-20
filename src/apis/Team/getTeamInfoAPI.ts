import { request } from "../axios";

interface teamHookData {
    team_id: number,
    secret: string
}

const getTeamInfoAPI = (params: teamHookData) => {
    return request("/admin/team/status/secret", {
        method: "GET",
        params: params
    });
};

export default getTeamInfoAPI;