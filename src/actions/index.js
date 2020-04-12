import { GET_API } from '../middlewares/api'

export const REPOS_REQUEST = 'REPOS_REQUEST';
export const REPOS_SUCCESS = 'REPOS_SUCCESS';
export const REPOS_FAILURE = 'REPOS_FAILURE';

const fetchRepos = () => ({
    [GET_API]: {
        types: [ REPOS_REQUEST, REPOS_SUCCESS, REPOS_FAILURE ],
        url: 'https://api.github.com/repositories',
    }
});

export const loadRepos = () => (dispatch, getState) => {
    const repos = getState().repos;

    if (repos && Object.values(repos).length > 0) {
        return null;
    }

    return dispatch(fetchRepos());
};

