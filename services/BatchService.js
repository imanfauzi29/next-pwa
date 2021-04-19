import axios from "axios";
import BaseService from "./BaseService";
import Utils from "../utils/Utils";

export default class BatchService extends BaseService {
  subPath = "batchs/batch";

  getTableUrl(queryParams = "") {
    return this.endpoint(this.subPath, queryParams);
  }

  getDataBatch() {
    return axios
      .get(
        this.endpoint(this.subPath, "?page=1&perPage=100"),
        this.authHeaders()
      )
      .then((res) => res.data);
  }

  getDataBatchById(id) {
    return axios
      .get(this.endpoint(this.subPath + "/info/" + id), this.authHeaders())
      .then((res) => res.data);
  }

  getBatchContentError(id) {
    return axios
      .get(this.endpoint(this.subPath + "/error/" + id), this.authHeaders())
      .then((res) => res.data);
  }

  addBatches(data, file) {
    let authHeaders = this.authHeaders();
    authHeaders.headers["Content-Type"] = "multipart/form-data";
    let encData = Utils.encodePayload(data);

    return axios
      .post(
        this.endpoint(this.subPath, "?payload=" + encData),
        file,
        authHeaders
      )
      .then((res) => res.data);
  }

  postBatches(body) {
    return axios
      .post(
        this.endpoint(this.subPath, "/post"),
        this.withUserId(body),
        this.authHeaders
      )
      .then((res) => res.data);
  }

  relocateBatch(data) {
    return axios
      .post(
        this.endpoint(this.subPath + "/relocate"),
        data,
        this.authHeaders(this.TOKEN)
      )
      .then((res) => res.data);
  }

  retryValidationBatch(idBatch) {
    return axios
      .get(
        this.endpoint(`batchs/batch/validation/${idBatch}/retry`),
        this.authHeaders
      )
      .then((res) => res.data);
  }

  getBatchContent(idBatch, queryParams="") {
    return axios.get(
      this.endpoint(this.subPath, `/content/${idBatch}${queryParams}`),
      this.authHeaders()
    ).then(res => res.data)
  }

  postImageCorrection(data, file) {
    let authHeaders = this.authHeaders();
    authHeaders.headers["Content-Type"] = "multipart/form-data";
    let encData = Utils.encodePayload(data);

    return axios.post(
      this.endpoint(this.subPath, `/image-correction?payload=${encData}`),
      file,
      authHeaders
    ).then((res) => res.data)
  }

  getSmallBatchInfo(id) {
    return axios.get(this.endpoint(this.subPath, `/info/${id}`))
    .then(res => res.data)
  }

  getSmallBatch(smallBatchId) {
    return axios.get(this.endpoint(this.subPath, `/small-batch/${smallBatchId}`))
    .then(res => res.data)
  }

  getSmallBatchUrl(smallBatchId) {
    return this.endpoint(this.subPath, `/small-batch/${smallBatchId}`)
  }

  deleteBatch(batchId) {
    return axios.delete(
      this.endpoint(this.subPath, `/${batchId}`),
      this.authHeaders()
    ).then(res => res.data)
  }
}
