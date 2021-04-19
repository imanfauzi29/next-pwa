import BaseService from "./BaseService";
import axios from "axios";

export default class RoleService extends BaseService {
  subPath = "roles/roles";

  getTableUrl(queryParams = "") {
    return this.endpoint(this.subPath, queryParams);
  }

  getTableSearchUrl(queryParams = "") {
    return this.endpoint(`roles/search${queryParams}`);
  }

  getRoleList(queryParams = "") {
    return axios
      .get(this.endpoint(`${this.subPath}${queryParams}`), this.authHeaders())
      .then((res) => res.data);
  }

  addRole(data) {
    return axios
      .post(
        this.endpoint(this.subPath),
        this.withUserId(data),
        this.authHeaders()
      )
      .then((res) => res.data);
  }

  updateRole(data, id) {
    return axios
      .put(
        this.endpoint(this.subPath, "/" + id),
        this.withUserId(data),
        this.authHeaders()
      )
      .then((res) => res.data);
  }

  deleteRole(id) {
    return axios
      .delete(this.endpoint(this.subPath, "/" + id), this.authHeaders())
      .then((res) => res.data);
  }

  async getRevampMenu() {
    const res = await axios.get(
      this.endpoint("roles/revamp-app-menu"),
      this.authHeaders()
    );
    return res.data;
  }
}
