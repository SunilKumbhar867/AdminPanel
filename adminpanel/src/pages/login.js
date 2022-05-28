
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField
} from '@material-ui/core';
import "../css/main.css";
import {
  AppBar, Tabs, Tab, Typography
} from '@material-ui/core';

import axios from 'axios';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
    margin: '10px auto'
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    flexBasis: 500,
  },
  button: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      email: 'sunil@sugarcosmetics.com',
      password: '1234',
      vertical: 'top',
      horizontal: 'center',
      value: 0,
    };
  }

  handleChange = (event, value) => {
    // console.log(value);
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  }

  changeHandler = e => {
    // console.log(e)
    this.setState({ [e.target.name]: e.target.value });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  submitHandler = async (e) => {
    try {
      this._isMounted = true;
      // console.log("Hello World");
      if (this._isMounted) {
        this.setState({ open: true });
      }
      e.preventDefault();
      // let headers = { 'Content-Type': 'application/json' }
      let objAdminLogin = this.state;

      return await axios.post(`${process.env.REACT_APP_URL_NODE}adminLogin`, objAdminLogin).then((resData) => {
        this.setState({
          isAuth: true,
          token: resData.data.token,
          authLoading: true,
          userId: resData.userId
        });
        console.log(resData.data.data)

        localStorage.setItem('token', resData.data.data.token);
        // localStorage.setItem('userId', resData.data.data.success._id);
        localStorage.setItem('userId', resData.data.data.success.id);
        localStorage.setItem('role', 'admin');

        const remainingMilliseconds = 60 * 60 * 100000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.props.onLogin('admin');
        this.props.history.push("/home")
        this.setAutoLogout(remainingMilliseconds);

        // console.log(resData.userId);

      });
    } catch (error) {
      this.setState({
        open: false
      });
      console.log('issues is in submit handler')
      throw new Error(error);
    }

  }

  deliverysubmitHandler = e => {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ open: true });
    }
    e.preventDefault();
    fetch(process.env.REACT_APP_URL_NODE + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        role: 'author'
      })
    })

      .then(res => {
        // console.log(res);
        if (res.status === 500) {
          // throw new Error('Validation failed.');
          throw res;
        }
        if (res.status !== 200 && res.status !== 201) {
          // console.log('Error!');
          // throw new Error('Could not authenticate you!');
          throw res;
        }
        return res.json();
      })
      .then(resData => {
        //console.log(resData.code);
        if (resData.code === '0' || resData.code === '01') {
          // console.log(resData);
          this.setState({
            error: true,
            open: false,
            message: resData.data.message
          });
        }
        else {
          this.setState({
            isAuth: true,
            token: resData.data.token,
            authLoading: false,
            userId: resData.userId
          });
          localStorage.setItem('token', resData.data.token);
          localStorage.setItem('userId', resData.data.success._id);
          localStorage.setItem('role', 'author');
          const remainingMilliseconds = 60 * 60 * 100000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem('expiryDate', expiryDate.toISOString());
          this.props.onLogin('author');
          this.props.history.push("/author")
          this.setAutoLogout(remainingMilliseconds);
        }
      })
      .catch(err => {
        // console.log(err);
        err.text().then(errorMessage => {
          const errorMessage1 = JSON.parse(errorMessage);
          //  console.log(errorMessage1.errorMessage);

          this.setState({
            error: true,
            open: false,
            message: errorMessage1.errorMessage
          });
        })
      });

    // await axios.post(`${process.env.REACT_APP_URL_NODE}adminLogin`, login).then((resData) => {

    // });
  }

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.props.logoutHandler();
    }, milliseconds);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClose = () => {
    this.setState({ error: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { vertical, horizontal, error } = this.state;
    return (
      <React.Fragment>
        <div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={error}
            onClose={this.handleClose}
            key={vertical + horizontal}
          >
            <Alert severity="error">{this.state.message}</Alert>
          </Snackbar>
        </div>
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHVvXIc43n-sHK9xOyzy3Sfa9swALcawWww&usqp=CAU)" }}>
            <div className={classes.root} >
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Login" />
                </Tabs>
              </AppBar>
              {/* <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        > */}
              <TabContainer dir={theme.direction}>
                <form className="form-signin" onSubmit={this.submitHandler}>
                  <div className="form-label-group">
                    <Grid container style={{ width: '100%' }} spacing={1} alignItems="flex-end">
                      <Grid item xs={1}>
                        <AccountCircle />
                      </Grid>
                      <Grid item xs={11}>
                        <TextField
                          id="input-with-icon-grid"
                          label="Email"
                          style={{ width: '100%' }}
                          name="email"
                          value={this.state.email}
                          onChange={this.changeHandler}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <br />
                  <div className="form-label-group">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={1}>
                        <LockIcon />
                      </Grid>
                      <Grid item xs={11}>
                        <FormControl className={(classes.margin, classes.textField)} style={{ width: '100%' }}>
                          <InputLabel htmlFor="adornment-password">Password</InputLabel>
                          <Input
                            id="standard-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            name="password"
                            onChange={this.changeHandler}
                            style={{ width: '100%' }}
                            endAdornment={(
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                  onMouseDown={this.handleMouseDownPassword}
                                >
                                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            )}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                  </div>


                  <br />
                  <Button variant="contained" color="secondary" className={classes.button} type="submit">
                    Login
                  </Button>
                  <Link to="/forgetpasswordadminuser" style={{ 'float': 'right' }}>
                    <Typography>Forget Password</Typography>
                  </Link>
                </form>
              </TabContainer>
              {/* <TabContainer dir={theme.direction}>
          <form className="form-signin"  onSubmit={this.deliverysubmitHandler}>
          <div className="form-label-group">
        <Grid container style = {{width: '100%'}} spacing={1} alignItems="flex-end">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <TextField 
            id="input-with-icon-grid" 
            label="Email" 
            style = {{width: '100%'}} 
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
            />
          </Grid>
        </Grid>
        </div>
        <br />
        <div className="form-label-group">
        <Grid container spacing={1}  alignItems="flex-end">
          <Grid  item xs={1}>
            <LockIcon />
          </Grid>
          <Grid  item xs={11}>
          <FormControl className={(classes.margin, classes.textField)}  style = {{width: '100%'}}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  name="password"
                  onChange={this.changeHandler}
                  style = {{width: '100%'}}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}
                />
              </FormControl>
          </Grid>
      </Grid>
        
        </div>

      
<br/>
        <Button variant="contained" color="secondary" className={classes.button} type ="submit" >
              Login
        </Button>
            <Link to="/forgetpasswordauthor" style={{'float':'right'}}>
            <Typography>Forget Password</Typography>
            </Link>
           
      </form> 
          </TabContainer> */}
              {/* </SwipeableViews> */}
            </div>
            {/* <Link to="forgetpassword">Forget Password</Link> */}
            {/* </div> */}
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={this.state.open} >
          <CircularProgress color="inherit" />
        </Backdrop>

      </React.Fragment>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// export default withRouter((withStyles(styles)(login)))
export default withRouter((withStyles(styles, { withTheme: true })(login)))
