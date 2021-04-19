import BaseService from "./BaseService";
import axios from "axios";

export default class SiteUserService extends BaseService {
    subPath = 'sites/site-users'

    getTableUrl(queryParam = '') {
        return this.endpoint(this.subPath, queryParam)
    }

    getSiteUser() {
        return axios.get(
            this.endpoint(this.subPath),
            this.authHeaders()
        ).then(res => res.data)
    }

    deleteSiteUser(data) {
        return axios.delete(
            this.endpoint(this.subPath + '/' + data.id),
            this.authHeaders()
        ).then(res => res.data)
    }

    updateSiteUser(data) {
        return axios.put(
            this.endpoint(this.subPath + '/' + data.id),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }

    addSiteSiteUser(data) {
        return axios.post(
            this.endpoint(this.subPath),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }
}
