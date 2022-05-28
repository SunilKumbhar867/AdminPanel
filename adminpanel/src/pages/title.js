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
// const axios = require('axios').default;

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadService from '../services/file-upload.service';
import { Avatar, Box, Card, CardHeader, CardMedia, Fade, Grid, Modal, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';


const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class title extends Component {
    constructor(props) {
        super(props);

        this.selectFiles = this.selectFiles.bind(this);
        this.upload = this.upload.bind(this);
        this.uploadImages = this.uploadImages.bind(this);

        this.state = {
            // title :'',
            id : null,
            currentimage: undefined,
            titlename: undefined,
            imgUrl: undefined,

            setOpen2: false,
            modalState: false,
            selectedFiles: undefined,
            previewImages: [],
            progressInfos: [],
            message: [],
            imageInfos: [],
            page: 0,
            count: 100,
            data: [],
            open: false,
            setOpen: false,
            columns: [
                {
                    name: "username",
                    label: "UserName",
                    options: {
                        filter: false,
                    }
                },
                {
                    name: "titlename",
                    label: "TitleName",
                    options: {
                        filter: true,
                    }
                },
                {
                    name: "imageurl",
                    label: "Image",
                    options: {
                        filter: true,
                        customBodyRender: (value, tableMeta, updateValue) => (
                            /**doubt */


                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="90"
                                src={`http://localhost:5000/${tableMeta.rowData[2]}`}
                                title="Contemplative Reptile"
                            />
                        )
                    }
                },
                {
                    name: "id",
                    label: "Update",
                    options: {
                        filter: false,
                        customBodyRender: (value, tableMeta, updateValue) => (

                            <IconButton aria-label="update" onClick={() => { this.handleChangeUpdate(tableMeta.rowData[3]) }}>
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
                            <IconButton aria-label="delete" onClick={() => { this.handleChangeDelete(tableMeta.rowData[3]) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                },
            ]
        };

    }

    componentDidMount() {
        const page = 0;
        this.getData(page)
    }

    getData = async (page) => {
        try {
            /**loader */
            this._isMounted = true;
            if (this._isMounted) {
                this.setState({ open: true });
            }
            // console.log(page);

            let fillDataTable = this.state;
            let resData = await axios.get(`${process.env.REACT_APP_URL_NODE}files`, fillDataTable)

            this.setState({
                page: page,
                data: resData.data.data.map(post => {
                    return {

                        username: post.username,
                        titlename: post.titlename,
                        imageurl: post.imageurl,
                        id: post.id

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


    handleChangeDelete = async (e) => {
        try {
            // let objUserId = {
            //     id: e
            // }
            // console.log(e)
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
                    title: 'Title Banner Deleted Successfully',
                    icon: 'success',
                })

                if (resultSave.isConfirmed) {
                    let objUserId = {
                        id: e
                    }
                    let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}titledelete`, objUserId);
                    if (resData.data.code === 200) {
                        this.getData();
                    } else if (resultSave.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info');
                    }
                }

            }

        } catch (error) {

            console.log('Error occur in handleChangeDelete');
            throw new Error(error)
        }

    }

    handleChangeUpdate = async (e) => {

        this.setState({
            setOpen2: true,
           
        });
        //get title according to id
        let objUserId = {
            id: e
        }
        let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}edit`, objUserId);

       
        // console.log(this.selectFiles[0])

        this.setState({
            id : resData.data.data.id,
            titlename: resData.data.data.titlename,
            imgUrl: resData.data.data.imageurl,
            // currentimage: selectedFiles[0].name
        })



    }



    selectFiles(event) {
        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }

        this.setState({
            message: [],
            selectedFiles: event.target.files,
            previewImages: images
        });
    }


    uploadImages() {
        const selectedFiles = this.state.selectedFiles;
        console.log(selectedFiles)

        let _progressInfos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
        }

        this.setState(
            {
                setOpen: false,
                progressInfos: _progressInfos,
                message: [],
            },
            () => {
                for (let i = 0; i < selectedFiles.length; i++) {
                    this.upload(i, selectedFiles[i]);

                }
            }
        );

        // console.log()
    }

    upload(idx, file) {
        let _progressInfos = [...this.state.progressInfos];
        // console.log(idx, file);

        UploadService.upload({file:file,titlename:this.state.titlename}, (event) => {
            _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
            this.setState({
                progressInfos: _progressInfos,
            });
        }).then(() => {
            this.setState((prev) => {
                let nextMessage = [...prev.message, "Uploaded the image successfully: " + file.name];
                return {
                    message: nextMessage
                };
            });

            return UploadService.getFiles();
        }).then((files) => {
            this.getData()
            // this.setState({
            //     page: 10,
            //     imageInfos: files.data.data,
            //     data: files.data.data.map(get => {
            //         return {
            //             username: get.username,
            //             titlename: get.titlename,
            //             imageurl: get.imageurl,
            //             id: get.id
            //         };
            //     }),
            //     open: false

            // });
            console.log(this.state)
        }).catch(() => {
            _progressInfos[idx].percentage = 0;
            this.setState((prev) => {
                let nextMessage = [...prev.message, "Could not upload the image: " + file.name];
                return {
                    progressInfos: _progressInfos,
                    message: nextMessage
                };
            });
        });
    }

    handleClickOpen = () => {
        this.setState({
            setOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            previewImages : [],
            setOpen: false
        })

        this.setState({
            previewImages : [],
            setOpen2: false
        })
    };

    handleReset = () => {
        this.setState({
            previewImages: [],
            setOpen: true
        })

        this.setState({
            previewImages: [],
            setOpen2: true
        })
    }

    handleChange = e => {

        this.setState({ [e.target.name]: e.target.value });
       // console.log({ [e.target.name]: e.target.value })
        
    }

    upadteUploadImages = async(e) => {
        // const selectedFiles = this.state.selectedFiles;
        // this.setState({
        //     currentimage :selectedFiles[0].name
        // })
        let objUpdate = {
            id: this.state.id,
            title: this.state.titlename,
         
            imgurl: this.state.selectedFiles[0].name

        }
         //dddddddddd
        let resData = await axios.post(`${process.env.REACT_APP_URL_NODE}title/upadte`, objUpdate);

        this.setState({
            setOpen2: false
        })

        this.getData();
    }

    render() {
        const { selectedFiles, previewImages } = this.state;
        // console.log(this.state)
        const { columns, data } = this.state;
        const { page, count } = this.state;
        const { classes } = this.props;
        const options = {
            filter: true,
            sort: true,
            filterType: "dropdown",
            rowsPerPage: 10,
            count: count,
            page: page
        };

        return (
            <>


                <Container fixed>
                    <br />

                    <Button style={{
                        //borderRadius: 35,
                        backgroundColor: "blue",
                        float: "right",
                        //padding: "18px 36px",
                        //fontSize: "18px"
                    }} variant="outlined" onClick={this.handleClickOpen}>Add Title Banner</Button>

                    {/* add dialog popup */}
                    <Dialog open={this.state.setOpen} onClose={this.handleClose}>
                        <DialogTitle>Add Title Banner</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {/* To subscribe to this website, please enter your email address here. We
                                will send updates occasionally. */}
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="titlename"
                                label="Title"
                                type="title"
                                fullWidth
                                variant="standard"
                                onChange={this.handleChange}
                            />


                            <input
                                multiple
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                onChange={this.selectFiles}

                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Choose File
                                </Button>
                            </label>


                            {previewImages && (
                                <div>
                                    {previewImages.map((img, i) => {
                                        return <img className="preview" src={img} alt={"image-" + i} key={i} />;
                                    })}
                                </div>
                            )}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleReset}>Reset</Button>
                            <Button onClick={this.handleClose} disabled={!selectedFiles}
                                onClick={this.uploadImages}>Upload</Button>
                        </DialogActions>
                    </Dialog>

                    {/* update dialog popup */}
                    <Dialog open={this.state.setOpen2} onClose={this.handleClose}>
                        <DialogTitle>Add Title Banner</DialogTitle>
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
                                            label="Titlename"

                                            variant="outlined"
                                            name="titlename"
                                            value={this.state.titlename}
                                            onChange={this.handleChange}
                                            
                                            required
                                        />
                                    </Grid>
                                    <Grid item
                                        xs={6}
                                        className={classes.demo}>
                                        {/* <TextField
                                            id="outlined-basic"
                                            style={{ width: '100%' }}
                                            label="Email"
                                            variant="outlined"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                        /> */}

                                        <br />
                                        <input
                                            multiple
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="contained-button-file"
                                            onChange={this.selectFiles}
                                            defaultValue={this.state.currentimage}

                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">
                                                Choose File
                                            </Button>
                                        </label>



                                    </Grid>

                                    {previewImages && (
                                        <div>
                                            {previewImages.map((img, i) => {
                                                return (
                                                    <>
                                                        <Card sx={{ maxWidth: 345 }}>
                                                            <CardHeader
                                                                title="Selected image"
                                                            // subheader="September 14, 2016"
                                                            />
                                                            <CardMedia
                                                                component="img"
                                                                width="70"
                                                                height="140"
                                                                image={img}
                                                                alt="green iguana"
                                                            />

                                                        </Card>
                                                        {/* <img className="preview" src={img} alt={"image"} key={} height="140" width="140" /> */}
                                                    </>
                                                );
                                            })}
                                        </div>
                                    )}

                                </Grid>
                                <br />
                                {/* <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>
                                    Add
                                </Button> */}

                            </form>

                            <Card sx={{ maxWidth: 345 }}>
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

                            </Card>


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            {/* <Button onClick={this.handleReset}>Reset</Button> */}
                            <Button onClick={this.handleClose} disabled={!selectedFiles}
                                onClick={this.upadteUploadImages}>Update</Button>
                        </DialogActions>
                    </Dialog>
                    <br />

                    {/* modal */}


                    <MUIDataTable
                        title={"Title Banner"}
                        data={data}
                        columns={columns}
                        options={options}

                    />
                </Container>
                <Backdrop className={classes.backdrop} open={this.state.open} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        );
    }
}

export default withStyles(styles)(title);
