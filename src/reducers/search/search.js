import { 
    SEARCH_QUERY_SET,
    SEARCH_PAGE_SET,

    SEARCH_RESULTS_REQUEST,
    SEARCH_RESULTS_SUCCESS,
    SEARCH_RESULTS_FAILTURE
} from '../../constants'

const initialState = {
    isFetching: false,
    query: '',
    resuts: null,
    page: 1
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_QUERY_SET:
            return {
                ...state,
                query: action.query
            }
        case SEARCH_PAGE_SET:
            return {
                ...state,
                page: action.page
            }
        case SEARCH_PAGE_SET:
            return {
                ...state,
                resuts: action.resuts
            }
        case SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                resuts: action.resuts
            }
        case SEARCH_RESULTS_FAILTURE:
            return {
                ...state,
                isFetching: action.isFetching,
                errMsg: action.errMsg
            }
        default:
            return state
    }
}