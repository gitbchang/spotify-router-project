import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
import loginSVG from '../../public/log_in.svg';

import TopBar from './TopBar';
import BottomBar from './BottomBar';

import $ from "jquery";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      stats: '',
      error: {
        message: ''
      }
    }
  }

/*
  signIn() {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('error', error);
        this.setState({error});
      });
  }
*/

 login(callback) {
   var CLIENT_ID = '1f355714cb774cb4a4dbb60a6f035eb2';
   var REDIRECT_URI = 'http://jmperezperez.com/spotify-oauth-jsfiddle-proxy/';

   function getLoginURL(scopes) {
     return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
       '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
       '&scope=' + encodeURIComponent(scopes.join(' ')) +
       '&response_type=token';
   }

   var url = getLoginURL([
     'user-read-email'
   ]);

   console.log(url);

   var width = 450,
     height = 730,
     left = (screen.width / 2) - (width / 2),
     top = (screen.height / 2) - (height / 2);

   window.addEventListener("message", function (event) {
     var hash = JSON.parse(event.data);
     if (hash.type == 'access_token') {
       callback(hash.access_token);
     }
   }, false);

   var w = window.open(url,
     'Spotify',
     'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
   );

 }

  getUserData(accessToken) {
   return $.ajax({
     url: 'https://api.spotify.com/v1/me',
     headers: {
       'Authorization': 'Bearer ' + accessToken
     }
   });
 }
 

  render() {
    return (
      <div>
        <TopBar />
          <div className='form-inline' style={{margin: "5%"}}>
            <div className='form-group'>
              <TextField className='auto-clear' style={{marginRight: "5px"}} floatingLabelText="E-mail" onChange={(event)=> this.setState({email: event.target.value})} />
                <TextField className='auto-clear' hintText="Password Field" floatingLabelText="Password" type="password" style={{marginRight: "5px"}} autoComplete="off" onChange={(event)=>
                this.setState({password: event.target.value})} />
                  <RaisedButton label='Sign In' primary={true} onClick={()=> this.signIn()}></RaisedButton>
            </div>
            <div>{this.state.error.message}</div>
            <div>
              <Link to={ '/signup'}>Sign up instead</Link>              
            </div>
            <div>             
                <img 
                  style={{"width": "25%"}} 
                  src={loginSVG} 
                  alt="spotify-login-button"
                  onClick={() => this.login(function(accessToken){
                    this.getUserData(accessToken).then(function(response){
                      $(".results").html(response);     
                      this.setState({stats: response});
                      console.log('response', response);
                    })
                  })}  
                />              
            </div>
            <div className='results'></div>
          </div>
        <BottomBar />
      </div>
    );
  }
}

export default SignIn;