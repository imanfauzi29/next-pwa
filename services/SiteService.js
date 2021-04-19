import BaseService from "./BaseService";
import axios from "axios";

export default class SiteService extends BaseService {
    subPath = 'sites/sites'

    getTableUrl(queryParam = '') {
        return this.endpoint(this.subPath, queryParam)
    }

    getSite() {
        return axios.get(
            this.endpoint(this.subPath),
            this.authHeaders()
        ).then(res => res.data)
    }

    deleteSite(id) {
        return axios.delete(
            this.endpoint(this.subPath + '/' + id),
            this.authHeaders()
        ).then(res => res.data)
    }

    updateSite(data, id) {
        return axios.put(
            this.endpoint(this.subPath + '/' + id),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }

    addSite(data) {
        return axios.post(
            this.endpoint(this.subPath),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }

    checkSite() {
        return axios.get(
            this.endpoint(this.subPath + '/check-site'),
            this.authHeaders()
        ).then(res => res.data)
    }
}
