import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
import loginSVG from '../../public/log_in.svg';

import TopBar from './TopBar';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }


  signIn() {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('error', error);
        this.setState({error});
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
              <a href="/login"><img style={{"width": "25%"}} src={loginSVG} alt="spotify-login-button"/></a>
            </div>
          </div>
      </div>
    );
  }
}

export default SignIn;