import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper } from '@/_helpers';

const pollSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/surveys`;

export const pollService = {
    create,
    getAll,
    update,
    delete: _delete,
    poll: pollSubject.asObservable(),
    get pollValue () { return this.pollValue.value }
};

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}
function getAll() {
    return fetchWrapper.get(baseUrl);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(poll => {
            // update stored poll
            if (poll.id === pollSubject.value.id) {
                // publish updated poll
                poll = { ...pollSubject.value, ...poll };
                pollSubject.next(poll);
            }
            return poll;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
