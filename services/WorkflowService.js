import BaseService from "./BaseService";
import axios from "axios";

export default class WorkflowService extends BaseService {
    subPath = 'workflows/workflows'
    // subPath = 'zeebe/workflow'

    getTableUrl(queryParams = '') {
        return this.endpoint(this.subPath, queryParams)
    }

    loadWorkflowById(id) {
        return axios.get(
            this.endpoint(this.subPath + '/detail/' + id),
            this.authHeaders()
        ).then(res => res.data)
    }

    updateWorkflow(data, id) {

        return axios.put(
            this.endpoint(this.subPath + '/' + id),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }


    // deployWorkflow(id) {
    //     return axios.post(
    //         this.endpoint(this.subPath + '/deploy/' +id),
    //         this.authHeaders()
    //     ).then(res => res.data)
    // }

    deployWorkflow(data) {
        return axios.post(
            this.endpoint('zeebe/workflow/deploy'),
            data,
            this.authHeaders()
        ).then(res => res.data)
    }

    deleteWorkflow(id) {
        return axios.delete(
            this.endpoint(this.subPath + '/' + id),
            this.authHeaders()
        ).then(res => res.data)
    }

    getWorkflows() {
        return axios.get(
            this.endpoint(this.subPath),
            this.authHeaders()
        ).then(res => res.data)
    }

    storeWorkFlow(data) {
        return axios.post(
            this.endpoint(this.subPath),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }
}

