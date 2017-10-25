import { connect } from 'react-redux'
import { getSchools } from "../actions/School";
import { addSchoolToFavoriteList} from "../actions/User"
import { refreshUser } from '../actions/User'

import SearchResults from '../components/SearchResults'

const mapStateToProps = state => {
  return {
    //  map the following items from redux state to props in SearchResults component
    currentUser: state.user.currentUser,
    searchResults: state.school.searchResults,
    userRefreshed: state.user.refreshUser,
    addedSchool: state.user.addedSchool
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // map the following functions from Action files into SearchResults component props for use there
    getSchools: (location, major) => {
      dispatch(getSchools(location, major))
    },
    addSchoolToFavoriteList: (listID, school) => {
      dispatch(addSchoolToFavoriteList(listID, school))
    },
    refreshUser: () => {
      dispatch(refreshUser())
    }
  }
}

// here is where we actually connect the props to the SearchResults component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults)