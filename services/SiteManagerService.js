import BaseService from "./BaseService";
import axios from "axios";
import Utils from "../utils/Utils";

export default class SiteManagerService extends BaseService {
  subPath = "site-managers/sm/site-manager";
  TOKEN = "naL2ilrXHlGgbniqDnVq";

  getTableUrl(path = "", queryParam = "") {
    return this.endpoint(this.subPath + path, queryParam);
  }

  getUrlSiteManagerByUser(userId = 0) {
    return this.endpoint(`site-managers/sm/site-manager-user/${userId}`);
  }

  addSiteManager(data) {
    return axios
      .post(
        this.endpoint(this.subPath),
        this.withUserId(data),
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data);
  }

  removeSiteManager(id) {
    return axios
      .delete(
        this.endpoint(this.subPath + "/" + id),
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data);
  }

  updateSiteManager(data, id) {
    return axios
      .put(
        this.endpoint(this.subPath, `/${id}`),
        this.withUserId(data),
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data);
  }
}
