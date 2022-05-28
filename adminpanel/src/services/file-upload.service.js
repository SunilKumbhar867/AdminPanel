import React from "react";
import axios from "axios";

class FileUploadService {
    upload(data, onUploadProgress) {
        // let token = localStorage.getItem('token');
        // console.log(token);
        // this._isMounted = true;
        // if (this._isMounted) {
        //   this.setState({ open: true });
        // }
        let formData = new FormData();

        formData.append("photos", data.file);
        formData.append("titlename", data.titlename);
        return axios.post(`${process.env.REACT_APP_URL_NODE}upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });

    }

    uploadSilidingBanner(file) {
        // this._isMounted = true;
        // if (this._isMounted) {
        //   this.setState({ open: true });
        // }
        let formData = new FormData();

        formData.append("photos", file);
        return axios.post(`${process.env.REACT_APP_URL_NODE}siliding/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            // onUploadProgress,
        });

    }

    uploadSmallLayout(data) {
        // this._isMounted = true;
        // if (this._isMounted) {
        //   this.setState({ open: true });
        // }
        let formData = new FormData();

        formData.append("photos", data.file);
        formData.append("titlename", data.titlename);
        formData.append("mua", data.mua);
        formData.append("username", 'sunil');
        return axios.post(`${process.env.REACT_APP_URL_NODE}smallayout/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            // onUploadProgress,
        });

    }



    mainHTTP(formData, onUploadProgress) {
        return axios.post(`${process.env.REACT_APP_URL_NODE}upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    getFiles() {
        return axios.get(`${process.env.REACT_APP_URL_NODE}files`);
    }

    getFilesSlidilg() {
        return axios.get(`${process.env.REACT_APP_URL_NODE}filesSliding`);
    }
}

export default new FileUploadService();