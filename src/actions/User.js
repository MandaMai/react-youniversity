import request from 'superagent';

const baseUrl = 'https://youniversity1.herokuapp.com'

// funtion for making API call and login our user
export function login(user) {

    return dispatch => {
        return request.put(`${baseUrl}/api/session/mine`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .on("error", error => console.error("could not login user" + error))
        // we use a .then here rather than a .end because we want a promise established to control flow of WHEN we are ready to 
        // move the the Search Results page.  We only want to navigate there AFTER we have our logged in user and preferences
        .then(
            (response) => {

                // succuessful and completed API call, so we can trigger a state change on result and set 
                // the currentUser in local storage
                
                localStorage.setItem("currentUser", JSON.stringify(response.body));

                dispatch({ type: 'USER_LOGIN', result: response.body });

            }
        )
    }
}

// funtion for making API call and logout our user
export function logout() {
    
    return dispatch => {
        request.delete(`${baseUrl}/api/session/mine`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send()
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not logout user" + error);
                    return;
                }
                // remove our currentUser from local storage
                localStorage.removeItem("currentUser");
                // trigger state change on result
                dispatch({ type: 'USER_LOGOUT', result: response.body });

            }
        )
    }
}

// function for making API call and register a new user
export function register(user) {
    
    return dispatch => {
        request.post(`${baseUrl}/user/create`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not create user" + error);
                    return;
                }
                // trigger state change on result
                dispatch({ type: 'USER_REGISTERED', result: response.body });

            }
        )
    }
}

// function for making API call and updating our current user from the Edit Preferences component
export function updateUser(user) {
    
    return dispatch => {
        request.put(`${baseUrl}/user`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not update user" + error);
                    return;
                }
                // update currentUser in local storage
                localStorage.setItem("currentUser", JSON.stringify(response.body));
                // trigger state change on result
                dispatch({ type: 'USER_UPDATED', result: response.body });

            }
        )
    }
}

// function for making API call and adding a school to the favorite school list from the Search Results component
export function addSchoolToFavoriteList(listID, school) {
    
    return dispatch => {
        request.post(`${baseUrl}/list/${listID}/add`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(school)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not add school to user's favorite list" + error);
                    return;
                }
                // trigger state change on result
                dispatch({ type: 'FAVORITE_ADDED', result: response.body });

            }
        )
    }
}

// function for making API call and deleting a school from the favorite school list from the Favorite List component
export function deleteSchoolFromFavoriteList(listID, school) {
    
    return dispatch => {
        request.delete(`${baseUrl}/list/${listID}/delete/${school}`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(school)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not delete school from user's favorite list" + error);
                    return;
                }
                // trigger state change on result
                dispatch({ type: 'FAVORITE_DELETED', result: response.body });

            }
        )
    }
}

// function to make API call and update user favorite school list after and ADD from Search Results and 
// a DELETE from Favorite List
export function refreshUser() {
    
    return dispatch => {
        request.get(`${baseUrl}/user`)
        .withCredentials()
        .send()
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not update user" + error);
                    return;
                }
                // update currentUser in local storage
                localStorage.setItem("currentUser", JSON.stringify(response.body));
                // trigger state change on result
                dispatch({ type: 'USER_REFRESHED', result: response.body });

            }
        )
    }
}
