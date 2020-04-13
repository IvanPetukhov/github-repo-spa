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

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

const fetchUser = (login) => ({
    [GET_API]: {
        types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
        url: `https://api.github.com/users/${ login }`,
        schema: Schemas.USER
    }
});

export const loadUser = (login) => (dispatch, getState) => {
    const user = getState().user[login];

    if (user && Object.values(user).length > 0) {
        return null;
    }

    return dispatch(fetchUser(login));
};

export const STARRED_REQUEST = 'STARRED_REQUEST';
export const STARRED_SUCCESS = 'STARRED_SUCCESS';
export const STARRED_FAILURE = 'STARRED_FAILURE';

const fetchStarredRepos = (login) => ({
    [GET_API]: {
        types: [ STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE ],
        url: `https://api.github.com/users/${login}/starred`,
        schema: Schemas.REPOS
    }
});

export const loadStarredRepos = (login) => (dispatch, getState) => {
    const starredRepos = getState().starredRepos[login];

    if (starredRepos && Object.values(starredRepos).length > 0) {
        return null;
    }

    return dispatch(fetchStarredRepos(login));
};
