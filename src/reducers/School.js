import _ from 'lodash';

const school = (state = {}, action) => {

    const newState = _.merge({}, state);

    // switch statement will "listen" for dispatched actions and update state accordingly
    switch (action.type) {
        // Upon dispatch of action SEARCHED_SCHOOLS, we want to update searchResults in our state with schools from the action
        case "SEARCHED_SCHOOLS":
            newState.searchResults = action.schools;
            return newState;
        // Upon dispatch of action SCHOOL_DETAILS, we want to update schoolDetails in our state with schoolDetails from the action
        case "SCHOOL_DETAILS":
            newState.schoolDetails = action.schooldetails;
            return newState;
        default:
            return newState;
        }
}

export default school