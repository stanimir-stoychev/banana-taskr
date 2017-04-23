import React, {Component} from 'react';

// Material UI:
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';

export default class Login extends Component
{
  constructor(props, context)
  {
    super(props, context);

    this.state = {
      username: (typeof props.username === 'string') ? props.username : '',
      password: (typeof props.password === 'string') ? props.password : '',
      loading: (typeof props.loading === 'boolean') ? props.loading : false,
      loginFunction: (typeof props.loginFunction === 'function') ? props.loginFunction : (usr, psd) => {console.log('Username', usr); console.log('Password', psd)}
    };
  }

  componentWillReceiveProps(nextProps)
  {
    this.setState({
      username: (typeof nextProps.username === 'string') ? nextProps.username : '',
      password: (typeof nextProps.password === 'string') ? nextProps.password : '',
      loading: (typeof nextProps.loading === 'boolean') ? nextProps.loading : false,
      loginFunction: (typeof nextProps.loginFunction === 'function') ? nextProps.loginFunction : (usr, psd) => {console.log('Username', usr); console.log('Password', psd)}
    });
  }

  _setter_Username = (event, username) => {
    const valid = new RegExp(/[\w@\.]|^$/g);

    if (valid.test(username)) {
      this.setState({username});
    }
  }

  _setter_Password = (event, password) => {
    const valid = new RegExp(/[\w]|^$/g);

    if (valid.test(password)) {
      this.setState({password});
    }
  }

  render()
  {
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

    return (
      <Paper style={styles.login.paper}>
        <TextField
          style={styles.login.input}
          value={this.state.username}
          hintText="Banana Management Username"
          floatingLabelText="Username"
          onChange={this._setter_Username.bind(this)}
        />

        <TextField
          style={styles.login.input}
          value={this.state.password}
          hintText="Your Banana Password..."
          floatingLabelText="Password"
          type="password"
          onChange={this._setter_Password.bind(this)}
        />

        {(this.state.loading) ? (
          <RefreshIndicator
            size={40}
            left={10}
            top={0}
            status="loading"
            style={styles.login.refresh}
          />
        ) : (
          <RaisedButton
            label="Log in"
            primary={true}
            onTouchTap={
              () => {
                if (!this.state.username || !this.state.password) return;

                this.state.loginFunction(this.state.username, this.state.password);
              }
            }
          />
        )}
      </Paper>
    );
  }
}
