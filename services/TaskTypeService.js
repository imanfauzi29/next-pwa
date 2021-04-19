import BaseService from "./BaseService";
import axios from "axios";

export default class TaskTypeService extends BaseService {
    subPath = 'tasks/task-type';

    getTableUrl(queryParams = '') {
        return this.endpoint(this.subPath, queryParams)
    }

    getTaskType(queryParams = "") {
        return axios.get(
            this.endpoint(this.subPath, queryParams), 
            this.authHeaders(this.TOKEN)
        ).then((res) => res.data)
    }


    addTaskType(data) {
        return axios.post(
            this.endpoint(this.subPath),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }

    updateTaskType(data) {
        return axios.put(
            this.endpoint(this.subPath, '/' + data.id),
            this.withUserId(data),
            this.authHeaders()
        ).then(res => res.data)
    }

    deleteTaskType(data) {
        return axios.delete(
            this.endpoint(this.subPath, '/' + data.id),
            this.authHeaders()
        ).then(res => res.data)
    }

}