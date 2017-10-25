import { connect } from 'react-redux'
import { register } from '../actions/User'

import Register from '../components/Register'

//  map the registeredUser item from redux state to props in Register component
const mapStateToProps = state => {
  return {
    registeredUser: state.user.registeredUser
  }
}

// map the register function from Action file into Register component props for use there
const mapDispatchToProps = dispatch => {
  return {
    register: (user) => {
      dispatch(register(user))
    }
  }
}

// here is where we actually connect the props to the Register component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)