import { connect } from 'react-redux'
import { login, logout } from '../actions/User'

import NavLogin from '../components/NavLogin'
import "../components/Navigation.css"

//  map the currentUser item from redux state to props in NavLogin component
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // map the following functions from Action files into NavLogin component props for use there
    login: (user) => {
      // we "return" here so that we can pass the promise that comes back from the login function
      return dispatch(login(user))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

// here is where we actually connect the props to the NavLogin component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLogin)