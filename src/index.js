import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, browserHistory, Redirect, Link, Switch, NavLink, withRouter} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Material UI Components:
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';

//import firebase stuff
import firebase from "firebase";
import config from "./firebase/config";

// Custom Components:
import Login from './components/Login';

injectTapEventPlugin();

class App extends Component {
  constructor(props, context) {
		super(props, context);

    this.state = {
      user: false,
      isAdmin: false,
      drawerOpen: false,
      loginLoading: false,
    };
	}

  componentDidMount() {
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => this.setState({user, loginLoading: false,}));

    this.setState(this.state);
  }

  _login_Employee = () => {
    let usr = 'banana1@bananamanagement.com';
    let psd = 'banana1';
  }

  _login_Boss = () => {
    let usr = 'bigboss@bananamanagement.com';
    let psd = 'bigboss';
  }

  _render_Drawer = () => {
    if (this.state.isAdmin) {
      return <Drawer
        open={this.state.drawerOpen}
      >
        <MenuItem>Tasks</MenuItem>
      </Drawer>;
    }
  }

  _render_MainPageContent = () => {
    const styles = {
      login: {
        paper: {
          width: '300px',
          heigth: '300px',
          margin: '1rem auto',
          padding: '0.5rem',
          textAlign: 'right',
        },
        input: {
          display: 'block',
          margin: '1rem auto',
        },
        refresh: {
          display: 'inline-block',
          position: 'relative',
          marginRight: '1rem',
        },
      }
    };

    if (!this.state.user) {
      return <Login
        loading={this.state.loginLoading}
        loginFunction={(username, password) => {
          this.setState({loginLoading: true});
          firebase.auth().signInWithEmailAndPassword(username, password);
        }}
      />;
    }

    if (this.state.isAdmin) {
      return <div>Employees</div>;
    }

    return <div>Tasks</div>;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar
            title="Banana Taskr"
            showMenuIconButton={false}
            iconElementRight={
              (this.state.user) ? (
                <IconButton
                  iconClassName="material-icons"
                  onTouchTap={() => firebase.auth().signOut()}
                >
                  person_pin
                </IconButton>
              ) : (
                <IconButton iconClassName="material-icons">visibility_off</IconButton>
              )
            }
          />

          {this._render_MainPageContent()}
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
