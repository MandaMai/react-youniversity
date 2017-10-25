import React, { Component } from 'react'
import { NavItem, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

import {User} from '../models/User'

import './NavLogin.css'

class NavLogin extends Component {
    
    // method to call login function with info entered in NabBar.Form
    loginUser = event => {
        event.preventDefault();
        let form = event.target
  
        let user = new User();
        // place from data into the user before calling login
        user.username = form.username.value;
        user.password = form.password.value
  
        this.props.login(user)
            // using .then here to wait for promise back from login BEFORE routing to SearchResults
            .then( result => {
                browserHistory.push('/searchresults');
            })
        
    }

    // method to call logout and rout back to home page
    logoutUser = event => {
        event.preventDefault()
        this.props.logout()
        browserHistory.push('/');
    }
  
    render() {
        
        // check if we have a currentUser to determine if we are already logged in
        if(this.props.currentUser){
            
          let user = this.props.currentUser;
  
          // we are logged in, so let's render the "normal" navigation bar
          return (
              <div>
                <Navbar.Text>
                      <Link className="navh4" to="/searchresults">Search Results</Link>
                </Navbar.Text>
                <Navbar.Text>
                      <Link className="navh4" to="/edituser">Edit Preferences</Link>
                </Navbar.Text>
                <Navbar.Text>
                      <Link className="navh4" to="/favoritelist">Favorites</Link>
                </Navbar.Text>
                <Navbar.Text pullRight className="signedin">
                      Signed in as: {user.firstName} {user.lastName}<Navbar.Link onClick={this.logoutUser} href="#" className="logoutlink">(Logout)</Navbar.Link>
                </Navbar.Text>
            </div>
          )
  
        }

        // we are NOT logged in, so let's render the login version of the navigation bar
        return (
            <div>
                <form onSubmit={this.loginUser}>
                    <Navbar.Form pullRight className="userLogin">
                        <FormGroup>
                            <FormControl name="username" type="text" placeholder="username" />
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <FormControl name="password" type="password" placeholder="password" />
                        </FormGroup>
                        {' '}
                        <Button type="submit" id="backbutton">Login</Button>
                    </Navbar.Form>

                    <Navbar.Text pullRight className="userOption">
                        <Link to="/register" className="createAccount">Create an Account</Link> 
                        <span className="loginOption">or Login&nbsp;<span className="glyphicon glyphicon-arrow-right"></span></span>

                    </Navbar.Text>
                </form>
            </div>
        );
    }
  }

  export default NavLogin;