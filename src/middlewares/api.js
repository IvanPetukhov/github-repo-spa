import { normalize, schema } from 'normalizr'

const getNextPageUrl = (response) => {
    const link = response.headers.get('link');
    if (!link) {
        return null;
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
    if (!nextLink) {
        return null;
    }

    return nextLink.trim().split(';')[0].slice(1, -1);
};

const getApi = (url, schema) => {

    return fetch(url)
        .then((response) => {
            return response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }

                return {
                    ...normalize(json, schema),
                    nextPageUrl: getNextPageUrl(response),
                };
            });
        })
};

const repoSchema = new schema.Entity('repo',{}, {
    idAttribute: repo => repo.full_name
});

const reposSchema = new schema.Entity('repos', {}, {
    idAttribute: repo => repo.full_name
});

const userSchema = new schema.Entity('user',{}, {
    idAttribute: user => user.login
});

const starredSchema = new schema.Entity('starredRepos', {}, {
    idAttribute: repo => repo.full_name
});

export const Schemas = {
    REPO: repoSchema,
    REPOS: [reposSchema],
    USER: userSchema,
    STARRED: starredSchema
};

export const GET_API = 'Get API';

export default (store) => (next) => (action) => {
    const getAPI = action[GET_API];

    const { url, types, schema } = getAPI;

    const actionWith = (data) => {
        const finalAction = {
            ...action,
            ...data
        };
        delete finalAction[GET_API];
        return finalAction;
    };

    const [ requestType, successType, failureType ] = types;
    next(actionWith({ type: requestType }));

    return getApi(url, schema).then(
        (response) => {
            return next(actionWith({
                response,
                type: successType
            }));
        },
        (error) => {
            return next(actionWith({
                type: failureType,
                error: error.message
            }));
        }
    )
}
