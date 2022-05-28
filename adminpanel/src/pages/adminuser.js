import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Swal from "sweetalert2";
import { Card, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@material-ui/core';

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});


class adminuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      status: false,
      id: null,
      mobile: null,
      setOpen: false,
      page: 0,
      count: 100,
      data: [],
      open: false,
      columns: [
        {
          name: "name",
          label: "Name",
          options: {
            filter: false,
          }
        },
        {
          name: "email",
          label: "Email",
          options: {
            filter: true,
          }
        },
        {
          name: "mobile",
          label: "Mobile",
          options: {
            filter: true,
          }
        },
        {
          name: "role",
          label: "Role",
          options: {
            filter: true,
          }
        },
        {
          name: "status",
          label: "Status",
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              // console.log(value);
              // console.log(tableMeta.rowData);
              // console.log(updateValue);
              return (
                // <FormControlLabel
                //   control={<Switch checked={value} onChange={e => this.handleChange(e, tableMeta.rowData[5])} name="status" />}
                // />
                <FormControlLabel
                  control={<Switch checked={value} color="primary" onChange={e => this.handleChangeStatus(e, tableMeta.rowData[5])} />}
                />
              );
            }
          }
        },
        {
          name: "id",
          label: "Update",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (

              <IconButton aria-label="update" onClick={() => { this.handleChangeUpdate(tableMeta.rowData[5]) }}>
                <EditIcon />
              </IconButton>
            )
          }
        },
        {
          name: "id",
          label: "Delete",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
              <IconButton aria-label="delete" onClick={() => { this.handleChangeDelete(tableMeta.rowData[5]) }}>
                <DeleteIcon />
              </IconButton>
            )
          }
        },
      ]

    };
  }


  handleClickOpen = () => {
    this.setState({
      setOpen: true
    })
  };

  handleClose = () => {
    this.setState({
      previewImages: [],
      setOpen: false
    })


  };

  handleReset = () => {
    this.setState({
      previewImages: [],
      setOpen: true
    })

  }



  handleChangeDelete = async (e) => {
    try {
      const result = await Swal.fire({
        toast: true,
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Are you sure want to delete',
        denyButtonText: `Don't save`,
      })

      if (result.isConfirmed) {
        const resultSave = await Swal.fire({
          toast: true,
          title: 'User Deleted Successfully',
          icon: 'success',
        })

        if (resultSave.isConfirmed) {
          let objUserId = {
            id: e
          }
          let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}adminDelete`, objUserId);
          if (resData.data.code === 200) {
            this.getData();
          } else if (resultSave.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        }

      }

      // console.log(resData.data.success)
    } catch (error) {
      // console.log(err);
      // err.text().then(errorMessage => {
      //   const errorMessage1 = JSON.parse(errorMessage);
      //   console.log(errorMessage1.errorMessage);
      //   this.setState({
      //     error: true,
      //     open: false,
      //     message: errorMessage1.errorMessage
      //   });
      // })
      console.log('Error occur in handleChangeDelete');
      throw new Error(error)
    }

  }

  handleChangeStatus = async (e, a) => {
    try {
      const val = e.target.checked;
      e.preventDefault();
      let objUserStatus = {
        id: a,
        status: e.target.checked
      }

      let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}updateUsersStatus`, objUserStatus);

      this.setState(
        prevState => ({
          data: prevState.data.map(
            el => el.id === a ? { ...el, status: val } : el
          )
        }));

      console.log(resData)

    } catch (error) {

      throw new Error(error)
    }
  }

  handleChangeUpdate = async (e) => {
    try {
      this.setState({
        setOpen: true,

      });

      let objUpdate = {
        uravtar: e
      }

      let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}adminLogin/avatar`, objUpdate);
      this.setState({
        id: resData.data.data.id,
        username: resData.data.data.name,
        email: resData.data.data.email,
        mobile: resData.data.data.mobile
      })

    } catch (error) {
      throw new Error(error);
    }
  }


  componentDidMount() {
    const page = 0;
    this.getData(page)
  }

  // get data
  getData = async (page) => {
    try {
      /**loader */
      this._isMounted = true;
      if (this._isMounted) {
        this.setState({ open: true });
      }
      // console.log(page);

      let fillDataTable = this.state;
      let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}adminUser`, fillDataTable)

      this.setState({
        page: page,
        data: resData.data.data.map(post => {
          return {
            name: post.name,
            email: post.email,
            mobile: post.mobile,
            status: post.status,
            id: post.id,
            role: 'admin'
          };
        }),
        open: false
      });

      console.log(resData);
    } catch (error) {
      this.setState({
        open: false
      });
      throw new Error(error)
    }



  };


  changePage = page => {
    this.getData(page);
  };


  handleChange = e => {

    this.setState({ [e.target.name]: e.target.value });
    //  console.log({ [e.target.name]: e.target.value })

  }


  adminUpdate = async (e) => {

    const objUpdate = {
      id: this.state.id,
      username: this.state.username,
      email: this.state.email,
      mobile: this.state.mobile,
      // status : this.state.status  
    }

    let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}adminUser/update`, objUpdate);
    // console.log(resData);

    this.setState({
      setOpen: false,
      setOpen2: false
    })

    this.getData();
  }


  render() {
    // console.log(this.state);
    const { columns, data } = this.state;
    const { page, count } = this.state;
    const { classes } = this.props;

    const options = {
      filter: true,
      sort: true,
      filterType: "dropdown",
      // serverSide: true,
      rowsPerPage: 10,
      count: count,
      page: page,

      // onTableChange: (action, tableState) => {
      //   // console.log(action, tableState);
      //   // a developer could react to change on an action basis or
      //   // examine the state as a whole and do whatever they want

      //   switch (action) {
      //     case "changePage":
      //       this.changePage(tableState.page);
      //       break;
      //   }
      // }
    };



    return (
      <>
        <Container fixed>
          <br />
          <Link to="/home/addadminuser"><Button style={{
            //borderRadius: 35,
            backgroundColor: "green",
            float: "right",
            //padding: "18px 36px",
            //fontSize: "18px"
          }} variant="contained"><AddIcon /></Button></Link>


          {/* Dialog box */}

          {/* update dialog popup */}
          <Dialog open={this.state.setOpen} onClose={this.handleClose}>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* To subscribe to this website, please enter your email address here. We
                                will send updates occasionally. */}
              </DialogContentText>
              <form onSubmit={this.submitHandler}>
                <Grid container spacing={3}>

                  <Grid item
                    xs={6}
                    className={classes.demo}>
                    <TextField
                      id="outlined-basic"
                      style={{ width: '100%' }}
                      label="UserName"
                      variant="outlined"
                      name="username"
                      value={this.state.username}
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



                </Grid>
                <br />
                {/* <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>
                                    Add
                                </Button> */}

              </form>

              {/* <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title="Pervious image"
                // subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  width="70"
                  height="140"
                  image={`http://localhost:5000/${this.state.imgUrl}`}
                  alt="green iguana"
                />

              </Card> */}


            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              {/* <Button onClick={this.handleReset}>Reset</Button> */}
              <Button onClick={this.handleClose}
                onClick={this.adminUpdate}>Update</Button>
            </DialogActions>
          </Dialog>


          <br />

          <MUIDataTable
            title={"Admin User"}
            data={data}
            columns={columns}
            options={options}

          />
        </Container>
        {/* <Backdrop className={classes.backdrop} open={this.state.open} >
          <CircularProgress color="inherit" />
        </Backdrop> */}
      </>
    );
  }
}

export default withStyles(styles)(adminuser);
