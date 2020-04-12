import {GET_API, Schemas} from '../middlewares/api'

export const REPOS_REQUEST = 'REPOS_REQUEST';
export const REPOS_SUCCESS = 'REPOS_SUCCESS';
export const REPOS_FAILURE = 'REPOS_FAILURE';

const fetchRepos = () => ({
    [GET_API]: {
        types: [ REPOS_REQUEST, REPOS_SUCCESS, REPOS_FAILURE ],
        url: 'https://api.github.com/repositories',
        schema: Schemas.REPOS
    }
});

export const loadRepos = () => (dispatch, getState) => {
    const repos = getState().repos;

    if (repos && Object.values(repos).length > 0) {
        return null;
    }

    return dispatch(fetchRepos());
};

export const REPO_REQUEST = 'REPO_REQUEST';
export const REPO_SUCCESS = 'REPO_SUCCESS';
export const REPO_FAILURE = 'REPO_FAILURE';

const fetchSingleRepo = (fullName) => ({
    [GET_API]: {
        types: [ REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE ],
        url: `https://api.github.com/repos/${ fullName }`,
        schema: Schemas.REPO
    }
});

export const loadSingleRepo = (fullName) => (dispatch, getState) => {
    const repo = getState().repo[fullName];

    if (repo && Object.values(repo).length > 0) {
        return null;
    }

    return dispatch(fetchSingleRepo(fullName));
};
