import BaseService from "./BaseService";
import axios from "axios";

export default class UserTaskService extends BaseService {
    subPath = 'user-tasks/user-tasks';

    getTableUrlMyTask(queryParams = '') {
        return this.endpoint(this.subPath, `/my-task${queryParams}`)
    }

    getUserTaskById(id) {
        return axios.get(
            this.endpoint(this.subPath, `/find/${id}`),
            this.authHeaders()
        ).then(res => res.data)
    }

    requestNewTask(data) {
        let account = this.userSession.user.image.account
        return axios.post(
            this.endpoint(this.subPath, `/request-new-task`),
            this.withUserId(data),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

    // Label Studio Endpoint
    getTableUrlTask(queryParams = "") {
        return this.endpoint(`user-tasks/label-studio/get-content-task${queryParams}`)
        // return this.endpoint(this.subPath, `/get-content-task${queryParams}`)
    }

    getLabelStudioFirstTask() {
        let account = this.userSession.user.image.account
        return axios.get(
            this.endpoint(`user-tasks/label-studio/get-content-task?page=1&per_page=1`),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

    getLabelStudioMyContents(queryParams = '') {
        let account = this.userSession.user.image.account
        return axios.get(
            this.endpoint(`user-tasks/label-studio/get-content-task${queryParams}`),
            // this.endpoint(this.subPath, `/get-content-task${queryParams}`),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

    saveCurrentContentLabelStudio(data) {
        let account = this.userSession.user.image.account
        return axios.post(
            this.endpoint(`user-tasks/label-studio/save-current-task`),
            this.withUserId(data),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

    submitTaskClassification(data) {
        let account = this.userSession.user.image.account

        return axios.post(
            this.endpoint(`user-tasks/label-studio/submit-classification`),
            this.withUserId(data),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

    startTaskClassification(data) {
        console.log(data)
        let account = this.userSession.user.image.account

        return axios.post(
            this.endpoint(`user-tasks/label-studio/start-task-classification`),
            this.withUserId(data),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

    startTaskLabeling(data) {
        let account = this.userSession.user.image.account

        return axios.post(
            this.endpoint(`user-tasks/label-studio/start-task-labeling`),
            this.withUserId(data),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

    submitTaskLabeling(data) {
        console.log(data)
        let account = this.userSession.user.image.account

        return axios.post(
            this.endpoint(`user-tasks/label-studio/submit-labeling`),
            this.withUserId(data),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }

}