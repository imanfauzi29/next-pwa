import axios from 'axios';
import React from 'react'
import BaseService from './BaseService';

export default class DynamicForm extends BaseService {
    subpath = ""
    url = 'http://192.168.100.5:8080/v1'

    saveFormProject(data) {
        let path = `${this.url}/save-form-project`
        return axios.post(
            path,
            this.withUserId(data),
            this.authHeaders
        )
        .then(res => res.data)
    }

    getForm() {
        let path = `${this.url}/get-form/15`
        return axios.get(
            path,
            this.authHeaders
        )
        .then(res => res.data)
    }

    saveCurrentTask(data) {
        let path = `${this.url}/save-current-task`
        let account = this.userSession.user.image.account
        return axios.post(
            path,
            this.withUserId(data),
            this.authHeaders(account.accessToken)
        ).then(res => res.data)
    }
    
    getContentTask() {
        let path = `${this.url}/get-content-task/1`
        return axios.get(path, this.authHeaders)
        .then(res => res.data)
    }
}