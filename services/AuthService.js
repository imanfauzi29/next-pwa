import BaseService from "./BaseService";
import axios from "axios";

export default class AuthService extends BaseService {
    constructor() {
        super()
    }
    login(username, password) {
        let data = {username: username, password: password}
        return axios.post(this.MOCKOON_URL + 'auth/login', data).then(res => res.data)

    }

    forgotPass(data) {
        return axios.post(this.MOCKOON_URL + 'auth/forgot-pass', data).then(res => res.data)

    }


}
