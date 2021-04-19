import axios from 'axios';
import BaseService from "./BaseService";

export default class ProjectAttributeService extends BaseService {
    subPath = 'projects/projects-attributes';

    getTableUrl(queryParams = '') {
        return this.endpoint(this.subPath , queryParams)
    }

    addProjectAttribute(data) {
        return axios.post(
            this.endpoint(this.subPath),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }

    updateProjectAttribute(data) {
        return axios.put(
            this.endpoint(this.subPath + '/' + data.id),
            this.withUserId(data)
        ).then(res => res.data)
    }

    deleteProjectAttribute(data) {
        return axios.delete(
            this.endpoint(this.subPath, '/' + data.id),
            this.authHeaders()
        ).then(res => res.data)
    }
}
