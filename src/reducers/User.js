import _ from 'lodash';

const user = (state = {}, action) => {
    
    state = {currentUser: JSON.parse(localStorage.getItem("currentUser"))};
    
    const newState = _.merge({}, state)

    // switch statement will "listen" for dispatched actions and update state accordingly
    switch (action.type) {
        // Upon dispatch of action USER_REGISTERED, we want to update registeredUser in our state with result from the action
        case "USER_REGISTERED":
            newState.registeredUser = action.result;
            return newState;
        // Upon dispatch of action USER_UPDATED, we want to update updatedUser in our state with result from the action
        case "USER_UPDATED":
            newState.updatedUser = action.result;
            return newState;
        // Upon dispatch of action USER_LOGIN, we want to update currentUser in our state with result from the action
        case "USER_LOGIN":
            newState.currentUser = action.result;
            return newState;
        // Upon dispatch of action USER_LOGOUT, we want to update updatedUser in our state with result from the action
        case "USER_LOGOUT":
            newState.updatedUser = action.result;
            return newState;
        // Upon dispatch of action USER_REFRESHED, we want to update refreshUser in our state with result from the action
        case "USER_REFRESHED":
            newState.refreshUser = action.result;
            return newState;
        // Upon dispatch of action FAVORITE_DELETED, we want to update deletedSchool in our state with result from the action
        case "FAVORITE_DELETED":
            newState.deletedSchool = action.result;
            return newState;
        // Upon dispatch of action FAVORITE_ADDED, we want to update addedSchool in our state with result from the action
        case "FAVORITE_ADDED":
            newState.addedSchool = action.result;
            return newState;
        default:
            return newState;
        }
}

export default user