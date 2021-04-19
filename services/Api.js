import axios from 'axios';
import BaseService from "./BaseService";

export default class Api extends BaseService{

    testAuth() {
        return axios.get(this.BASE_URL + '/api/v1/auth/test').then(res => res.data)
    }

    getRemoteTableDataAdmin(url, token = localStorage.getItem('token')) {
        
        return fetch(url, {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Bearer ' + token,
               
            })
        }).then(response => response.json())
    }


    //#region UNUSED ??
    changePrioritySmallBatch(data) {
        return axios.post(this.BASE_URL + '/api/v1/project/small-batch/update-priority', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.data)
    }

    assignSmallBatch(data) {
        return axios.post(this.BASE_URL + '/api/v1/project/small-batch/assign', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.data)
    }

    lockSmallBatch(data) {
        return axios.post(this.BASE_URL + '/api/v1/project/small-batch/lock', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.data)
    }

    unlockSmallBatch(data) {
        return axios.post(this.BASE_URL + '/api/v1/project/small-batch/unlock', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.data)
    }

    editOperatorModule(data) {
        return axios.post(this.BASE_URL + '/api/v1/site/edit-operator-module', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.data)
    }

    //#endregion


}
