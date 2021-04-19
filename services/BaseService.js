export default class BaseService {
    BASE_URL = 'https://revamp.lifewood.dev/api/v1/'
    BASE_URL_MOCK = 'http://175.41.188.103:5080/api/v1/'

    constructor(session) {
        this.userSession = session
    }

    endpoint(path, queryParams = '') {
        return this.BASE_URL + path + queryParams
    }

    mockEndpoint(path, queryParams = '') {
        return this.BASE_URL_MOCK + path + queryParams
    }

    localEndpoint(port, path = 'users', queryParams = '') {
        return `http://localhost:${port}/v1/${path}${queryParams}`
    }

    authHeaders(accessToken = '') {
        return {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            }
        }
    }

    withUserId(data) {
        data['user_id'] = this.userSession.user.image.user.id
        return data
    }
}
