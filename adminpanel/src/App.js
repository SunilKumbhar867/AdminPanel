import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from "./pages/login";
import Home from "./pages/home";
import ReactGa from "react-ga";
import ForgetPassword from "./pages/forgetpassword";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      token: '',
      role: 'admin',
      userId: '',

    }
  }

  componentDidMount = () => {
    ReactGa.initialize('UA-205466960-1');
    ReactGa.pageview('/');
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({
      isAuthenticated: true,
      token: token,
      role: role,
      userId: userId,
      loading: false
    });
    this.setAutoLogout(remainingMilliseconds);
  }

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  loginHandler = e => {
    // console.log(e);
    this.setState({
      isAuthenticated: true,
      role: e
    });
  }

  logoutHandler = () => {
    // console.log("Logout successful");

    this.setState({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

  }


  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={props => (this.state.isAuthenticated ? <Redirect to='/home' /> : <Login onLogin={this.loginHandler} logoutHandler={this.logoutHandler} />)} />
        <Route path="/home" render={props => (this.state.isAuthenticated ? <Home {...props} logoutHandler={this.logoutHandler} /> : <Redirect to='/' />)} />
        <Route path="/forgetpassword" render={(props) => <ForgetPassword />} />
        <Route path="*" exact render={props => <h1>Page Not Found</h1>} />
      </Switch>
    );

    return (
      <>
        <Router>
          {routes}
        </Router>
      </>
    );
  }
}

export default App;