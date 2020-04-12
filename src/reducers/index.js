import { combineReducers } from 'redux'

const reposReducer = (state = {}, action) => {
    if (action.response) {
        return  {
            ...state,
            ...action.response
        };
    }

    return state;
};

const rootReducer = combineReducers({
    repos: reposReducer
});

export default rootReducer;
