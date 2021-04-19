import axios from "axios";
import BaseService from "./BaseService";

export default class ProjectService extends BaseService {
  subPath = "projects/projects";

  getTableUrl(queryParams = "") {
    return this.endpoint(this.subPath, queryParams);
  }

  getProject() {
    return axios
      .get(this.endpoint(this.subPath), this.authHeaders())
      .then((res) => res.data);
  }

  getProjectById(projectId) {
    return axios
      .get(this.endpoint(this.subPath, `/find/${projectId}`), this.authHeaders())
      .then((res) => res.data);
  }

  addProject(data) {
    return axios
      .post(
        this.endpoint(this.subPath),
        this.withUserId(data),
        this.authHeaders()
      )
      .then((res) => res.data);
  }

  updateProject(data, id) {
    return axios
      .put(this.endpoint(this.subPath + "/" + id), this.withUserId(data))
      .then((res) => res.data);
  }

  deleteProject(id) {
    return axios
      .delete(this.endpoint(this.subPath, "/" + id), this.authHeaders())
      .then((res) => res.data);
  }

  getProjectSiteTableUrl(id, queryParams = "") {
    return this.endpoint(`projects/project-site/project/${id}`, queryParams);
  }

  getProjectFileManagerTableUrl(id, queryParams = "") {
    return this.endpoint(`projects/project-fm/project/${id}`, queryParams);
  }

  getFmList() {
    return axios
      .get(this.mockEndpoint("get-fm-list"), this.authHeaders())
      .then((res) => res.data);
  }

  assignSite(data, id) {
    return axios
      .post(
        this.endpoint(`projects/project-site`),
        this.withUserId(data),
        this.authHeaders()
      )
      .then((res) => res.data);
  }

  updateAssignSite(data, id) {
    return axios.put(
      this.endpoint(`projects/project-site/${id}`),
      this.withUserId(data),
      this.authHeaders()
      ).then((res) => res.data)
  }

  assignFm(data, id) {
    return axios
      .post(
        this.endpoint(`projects/project-fm`),
        this.withUserId(data),
        this.authHeaders()
      )
      .then((res) => res.data);
  }

  deleteFm(id) {
    return axios.delete(
      this.endpoint(`projects/project-fm/${id}`), 
      this.authHeaders()
    ).then((res) => res.data)
  }
  
  deleteSite(id) {
    return axios.delete(
      this.endpoint(`projects/project-site/${id}`), 
      this.authHeaders()
    ).then((res) => res.data)
  }

  getAttributeByProjectId(projectId, taskTypeId) {
    return axios.get(
      this.endpoint(`projects/projects-attributes/project/${projectId}/task-type/${taskTypeId}`),
      this.authHeaders()
    ).then((res) => res.data)
  }

  getProjectByWorkflow(workflowId) {
    return axios.get(
      this.endpoint(this.subPath, `workflow/${workflowId}`),
      this.authHeaders()
    ).then((res) => res.data)
  }

  getProjectSiteByProject(projectId, queryParams = '') {
    return axios.get(
      this.endpoint(`projects/project-site/project/${projectId}${queryParams}`), 
      this.authHeaders()
    ).then(res => res.data)
  }
}
