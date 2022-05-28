import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import "../css/main.css";
// import {  Link } from "react-router-dom";
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  input: {
    margin: theme.spacing(3),
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  // input: {
  //   display: 'none',
  // },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class addadminuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      open: false,
      error: false,
      se: false,
      vertical: 'top',
      horizontal: 'center',
      message: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitHandler = e => {
    this.setState({ open: true });
    e.preventDefault();
    fetch(process.env.REACT_APP_URL_NODE + 'addAdminUser'
      , {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          password: this.state.password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
      .then(res => {
        // console.log("Hello World",res);
        if (res.status === 500) {
          // throw new Error('Validation failed.');
          throw res;
        }
        if (res.status !== 200 && res.status !== 201) {
          //Encode the error
          // throw new Error('Creating or editing a post failed!');
          throw res;
        }
        // localStorage.setItem(username, this.state.name);
        return res.json();
      })
      .then(resData => {
        if (resData.code === '0' || resData.code === '01') {
          // console.log(resData);
          this.setState({
            error: true,
            open: false,
            message: resData.success
          });
        }
        else {
          // console.log(resData);
          this.setState({
            name: '',
            email: '',
            mobile: '',
            addressone: '',
            addresstwo: '',
            addressthree: '',
            city: '',
            state: '',
            country: '',
            password: '',
            role: '',
            open: false
          });
        }

      })
      .catch(err => {
        // console.log(err);
        err.text().then(errorMessage => {
          // console.log(errorMessage);
          const errorMessage1 = JSON.parse(errorMessage);
          // console.log(errorMessage1.errorMessage);
          this.setState({
            error: true,
            open: false,
            message: errorMessage1.errorMessage
          });
        })
        // console.log(err);
      });
  }

  handleClose = () => {
    this.setState({ error: false });
  };

  render() {
    const { vertical, horizontal, error } = this.state;
    const { classes } = this.props;

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
        <Container fixed>
          <br />
          <h1>Add User</h1>
          <form onSubmit={this.submitHandler}>
            <Grid container spacing={3}>
              <Grid item
                xs={6}
                className={classes.demo}>
                <TextField
                  id="outlined-basic"
                  style={{ width: '100%' }}
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item
                xs={6}
                className={classes.demo}>
                <TextField
                  id="outlined-basic"
                  style={{ width: '100%' }}
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item
                xs={6}
                className={classes.demo}>
                <TextField
                  id="outlined-basic"
                  style={{ width: '100%' }}
                  label="Mobile"
                  variant="outlined"
                  name="mobile"
                  value={this.state.mobile}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              {/* <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Address 1" 
           variant="outlined"
           name="addressone" 
           value={this.state.addressone}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Addrss 2" 
           variant="outlined"
           name="addresstwo" 
           value={this.state.addresstwo}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Address 3" 
           variant="outlined"
           name="addressthree" 
           value={this.state.addressthree}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="City" 
           variant="outlined"
           name="city" 
           value={this.state.city}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="State" 
           variant="outlined"
           name="state" 
           value={this.state.state}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Country" 
           variant="outlined"
           name="country" 
           value={this.state.country}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
         <FormControl variant="outlined" style = {{width: '100%'}} required>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          name="role"
          value={this.state.role}
          onChange={this.handleChange}
          label="Role"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Admin'}>Admin</MenuItem>
          <MenuItem value={'author'}>Author</MenuItem>
        </Select>
      </FormControl>
                </Grid> */}
              <Grid item
                xs={6}
                className={classes.demo}>
                <TextField
                  id="outlined-basic"
                  style={{ width: '100%' }}
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
            </Grid>
            <br />
            <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>
              Add
            </Button>

          </form>
        </Container>
        <Backdrop className={classes.backdrop} open={this.state.open} >
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(addadminuser);
