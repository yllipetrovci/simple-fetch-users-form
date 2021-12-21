import BaseService from "./_base-service";

class UserService extends BaseService {
    getUsers(pagination) {
        const { page, pageSize } = pagination;
        return this._getRequest({ authRequest: false, params: { results: (page * pageSize) } });
    }
}

export default new UserService();