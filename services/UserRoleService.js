import BaseService from "./BaseService";
import axios from "axios";
import Utils from "../utils/Utils";

export default class UserRoleService extends BaseService {

    addUserRole(data) {
        return axios.post(
            this.endpoint('user-roles/bind-user-role'),
            data,
            this.authHeaders(this.TOKEN)
        ).then(res => res.data)
    }

}
