import { SEARCH_RESULTS_REQUEST, SEARCH_RESULTS_SUCCESS, SEARCH_RESULTS_FAILTURE } from '../../constants'
import search from '../../reducers/search/search';

function resultsRequest() {
    return {
        type: SEARCH_RESULTS_REQUEST,
        isFetching: true
    }
}

function resultsSuccess(results) {
    return {
        type: SEARCH_RESULTS_SUCCESS,
        isFetching: false,
        results
    }
}

function resultsFailture(errMsg) {
    return {
        type: SEARCH_RESULTS_FAILTURE,
        isFetching: false,
        errMsg
    }
}

export const getSearchResults = query => {
    dispatch(resultsRequest())

    search.doSearch(query)
        .then(({results, err}) => {
            if(err) throw new Error(err)

            dispatch(resultsSuccess(results))
        })
        .catch(err => dispatch(resultsFailture(err)))
}