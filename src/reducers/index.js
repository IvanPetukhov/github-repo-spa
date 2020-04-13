import { combineReducers } from 'redux'
import {
    REPO_FAILURE,
    REPO_REQUEST,
    REPO_SUCCESS,
    REPOS_FAILURE,
    REPOS_REQUEST,
    REPOS_SUCCESS,
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
    pagination: paginationReducer
});

export default rootReducer;
