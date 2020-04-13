import {GET_API, Schemas} from '../middlewares/api'

export const REPOS_REQUEST = 'REPOS_REQUEST';
export const REPOS_SUCCESS = 'REPOS_SUCCESS';
export const REPOS_FAILURE = 'REPOS_FAILURE';

const fetchRepos = (nextPageUrl) => ({
    [GET_API]: {
        types: [ REPOS_REQUEST, REPOS_SUCCESS, REPOS_FAILURE ],
        url: nextPageUrl,
        schema: Schemas.REPOS
    }
});

export const loadRepos = (nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = 'https://api.github.com/repositories',
        pageCount = 0
    } = getState().pagination || {};

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchRepos(nextPageUrl));
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
