import BaseService from "./BaseService"
import axios from "axios"
import Utils from "../utils/Utils"

export default class UserService extends BaseService {
  subPath = "users/users"
  TOKEN = "FHo56pxC0cPyBzas6O35pPC8oqjPPGaOm1djAMqEck6QsHThdEKaTiziyPfn"

  getTableUrl(queryParams = "") {
    return this.endpoint(this.subPath, queryParams)
  }

  getUser() {
    return axios
      .get(this.endpoint(this.subPath), this.authHeaders(this.TOKEN))
      .then((res) => res.data)
  }

  addUser(data) {
    return axios
      .post(this.endpoint(this.subPath), this.withUserId(data), this.authHeaders(this.TOKEN))
      .then((res) => res.data)
  }

  updateUser(data, id) {
    let payload = Utils.encodePayload({ id: id })
    return axios
      .put(
        this.endpoint(this.subPath, "?payload=" + payload),
        this.withUserId(data),
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data)
  }

  deleteUser(id) {
    let payload = Utils.encodePayload({ id: parseInt(id) })
    return axios
      .delete(
        this.endpoint(this.subPath, "?payload=" + payload),
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data)
  }

  updatePassword(data, username) {
    let payload = Utils.encodePayload({ username: username })
    return axios
      .put(
        this.endpoint(this.subPath + "/change-password", "?payload=" + payload),
        data,
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data)
  }

  getSiteManagerBySite(id) {
    return axios
      .get(
        this.endpoint("site-managers/sm/site-manager/" + id),
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data)
  }

  getListSiteManager(id) {
    return axios
      .get(this.endpoint(this.subPath, "?per_page=1000"), this.authHeaders(this.TOKEN))
      .then((res) => res.data)
  }

  getPmList() {
    return axios
      .get(this.endpoint(this.subPath, "?per_page=1000"), this.authHeaders(this.TOKEN))
      .then((res) => res.data)
  }

  getListFileManager(id) {
    return axios
      .get(this.endpoint(this.subPath, "?per_page=1000"), this.authHeaders(this.TOKEN))
      .then((res) => res.data)
  }

  switchLanguage(data) {
    return axios
      .post(
        this.endpoint(this.subPath, "/language"),
        this.withUserId(data),
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data)
  }
}
