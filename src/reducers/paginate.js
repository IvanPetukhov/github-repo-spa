import { union, isEmpty } from 'lodash';

const paginate = ({ types }) => {
    const [ requestType, successType, failureType ] = types;

    const updatePagination = (state, action) => {
        const currState = state && isEmpty(state) ? {
            isFetching: false,
            nextPageUrl: undefined,
            pageCount: 0,
            ids: []
        } : state;
        switch (action.type) {
            case requestType:
                return {
                    ...currState,
                    isFetching: true
                };
            case successType:
                return {
                    ...currState,
                    isFetching: false,
                    ids: union(currState.ids, action.response.result),
                    nextPageUrl: action.response.nextPageUrl,
                    pageCount: currState.pageCount + 1
                };
            case failureType:
                return {
                    ...currState,
                    isFetching: false
                };
            default:
                return currState;
        }
    };

    return (state = {}, action) => {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                return {
                    ...state,
                    ...updatePagination(state, action)
                };
            default:
                return state;
        }
    };
};

export default paginate;
