import { combineReducers } from 'redux'
import {
    REPO_FAILURE,
    REPO_REQUEST,
    REPO_SUCCESS,
    REPOS_FAILURE,
    REPOS_REQUEST,
    REPOS_SUCCESS,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILURE, STARRED_FAILURE, STARRED_REQUEST, STARRED_SUCCESS
} from "../actions";
import paginate from "./paginate";

const reposReducer = (state = {}, action) => {
    switch (action.type) {
        case REPOS_REQUEST:
        case REPOS_SUCCESS:
        case REPOS_FAILURE:
            if (action.response) {
                return  {
                    ...state,
                    ...action.response.entities.repos
                };
            }
            break;
        default:
            break;
    }

    return state;
};

const repoReducer = (state = {}, action) => {
    switch (action.type) {
        case REPO_REQUEST:
        case REPO_SUCCESS:
        case REPO_FAILURE:
            if (action.response) {
                return  {
                    ...state,
                    ...action.response.entities.repo
                };
            }
            break;
        default:
            break;
    }

    return state;
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REQUEST:
        case USER_SUCCESS:
        case USER_FAILURE:
            if (action.response) {
                return  {
                    ...state,
                    ...action.response.entities.user
                };
            }
            break;
        default:
            break;
    }

    return state;
};

const starredReposReducer = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case STARRED_FAILURE:
        case STARRED_REQUEST:
        case STARRED_SUCCESS:
            if (action.response) {
                console.log({
                    ...state,
                    ...action.response.entities.repos
                });
                return  {
                    ...state,
                    ...action.response.entities.repos
                };
            }
            break;
        default:
            break;
    }

    return state;
};

const paginationReducer = paginate({
    types: [
        REPOS_REQUEST,
        REPOS_SUCCESS,
        REPOS_FAILURE
    ]
});

const rootReducer = combineReducers({
    repos: reposReducer,
    repo: repoReducer,
    user: userReducer,
    starredRepos: starredReposReducer,
    pagination: paginationReducer
});

export default rootReducer;
