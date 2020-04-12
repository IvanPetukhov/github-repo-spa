const getApi = (url) => {

    return fetch(url)
        .then((response) => {
            return response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }

                return {
                    ...json
                };
            });
        })
};

export const GET_API = 'Get API';

export default (store) => (next) => (action) => {
    const getAPI = action[GET_API];

    const { url, types } = getAPI;

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

    return getApi(url).then(
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
