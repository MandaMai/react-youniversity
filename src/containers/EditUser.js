import { connect } from 'react-redux'
import { updateUser } from '../actions/User'

import EditUser from '../components/EditUser'

//  map the following items from redux state to props in EditUser component
const mapStateToProps = state => {
  return {
    updatedUser: state.user.updatedUser,
    currentUser: state.user.currentUser
  }
}

// map the updateUser function from Action file into EditUser component props for use there
const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

// here is where we actually connect the props to the EditUser component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser)