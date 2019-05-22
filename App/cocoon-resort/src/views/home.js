import React, { Component } from 'react';
import { Input, Button, Form } from 'semantic-ui-react';
import App from '../app/App';
import homeClass from "../classes/home";
import NavigationBar from '../components/NavigationBar';
import PackageClass from '../classes/package';
// import bcrypt from 'bcrypt';

const Test = (props) => {
    return (
        <div>Robert, {props.name}</div>
    )
}

class Home extends Component {
    state = {
        name: '',
        file: '',
        imagePreviewUrl: '',
        fileName: '',
        test: ''
    }

    render() {
        // const user = App.getUsername();
        return (
            <div>
                <h1>Home of {/* {{/* user */}} */}</h1>
                <Input type='text' name='test' value={this.state.test} onChange={event => this.setState({ test: event.target.value })} />
                <Input type='button' value='upload' onClick={this.onClick}/>
                <Test name="kevin" />
            </div>
        )
    }
    // <Input type='file' id='fileName' name='fileName' onChange={event => this.setState({ fileName: event.target.value})} />
    // <Form action='http://localhost:8080/cocoon-resort/UploadDownloadFileServlet' method="post" encType="multipart/form-data">
    //     <Input type='file' name='fileName' />
    //     <Input type='submit' value='upload'/>
    // </Form>
    //
    // handleImageChange = (event) => {
    //     let reader = new FileReader();
    //     let file = event.target.files[0];
    //     reader.onloadend = () => {
    //         this.setState({
    //             file: file,
    //             imagePreviewUrl: reader.result
    //         });
    //         console.log('this.state.file', this.state.file);
    //     }
    //     reader.readAsDataURL(file);
    //     console.log('reader', reader);
    //     console.log('alo?', file);
    // }

    // handleImageChange = async (event) => {

    // const files = Array.from(event.target.files);
    // this.setState({ upload})
    // console.log(files);


    // files.forEach((file, i) => {
    //     formData.append(i, file)
    //     console.log(formData);
    // });

    // }

    onClick = async (event) => {

        // const saltRounds = 10;
        // const myPlaintextPassword = 'ALOO??MYPASS';
        // console.log('lol', bcrypt);
        //
        // bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
        //     console.log('loling le hash: ', hash);
        //     console.log('loling le err: ', err);
        // })
        // try {
        //     const fileName = document.getElementById('fileName').files[0];
        //     console.log(fileName);
        //
        //     let formData = new FormData();
        //     formData.append('fileName', fileName);
        //
        //     const response = await fetch(`http://localhost:8080/cocoon-resort/UploadDownloadFileServlet?packageId=7`, {
        //         method: 'POST',
        //         body: formData
        //     });
        //
        //     console.log('successfully sent');
        // } catch (err) {
        //     throw err;
        // }
        // const { file } = this.state;
        // let formData = new FormData();
        //
        // formData.append('file', file);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        //
        // console.log(formData);
        // try {
        //     console.log('file', file);
        //     const response = await fetch(`http://localhost:8080/cocoon-resort/UploadDownloadFileServlet?fileName=kevin`, {
        //         method: 'POST',
        //         body: file
        //     });
        // } catch (err) {
        //     throw err;
        // }
        // const data = this.state.imagePreviewUrl.split(',')[1];
        // let raw = window.atob(data);
        // let rawLength = raw.length;
        // let array = new Uint8Array(new ArrayBuffer(rawLength));
        // for (let i = 0; i < rawLength; i++) {
        //     array[i] = raw.charCodeAt(i);
        // }
        // let img = [];
        // for (let i = 0; i < rawLength; i++) {
        //     img.push((array[i]));
        // }
        // console.log('img', img.toString());
        // const info = { name: "alo?11!?", resortId: 1, details: "Hello World", price: 101, from: "2000-01-01", to: "2001-01-01", capacity: 5, image: img };
        // const pack = new PackageClass();
        // pack.createPackage(info.name, info.resortId, info.details, info.price, info.from, info.to, info.capacity, info.image);
        // const response = await
    }

    // async componentDidMount() {
    //     const home = new homeClass();
    //     const test = await home.getHome();
    // }
}

export default Home;