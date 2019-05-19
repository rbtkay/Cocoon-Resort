import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import App from '../app/App';
import homeClass from "../classes/home";
import NavigationBar from '../components/NavigationBar';
import PackageClass from '../classes/package';

const Test = (props) => {
    return (
        <div>Robert, {props.name}</div>
    )
}

class Home extends Component {
    state = {
        name: '',
        file: '',
        imagePreviewUrl: ''
    }

    render() {
        // const user = App.getUsername();
        return (
            <div>
                <h1>Home of {/* {{/* user */}} */}</h1>
                <Input
                    type='text'
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value})}
                    />

                <Input type='file' onChange={event => this.handleImageChange(event)} />
                <Button onClick={this.onClick} />
                <Test name="kevin" />
            </div>
        )
    }
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

    handleImageChange = async (event) => {
        let file = event.target.files[0];
        this.setState({ file });
        // const files = Array.from(event.target.files);
        // this.setState({ upload})
        // console.log(files);


        // files.forEach((file, i) => {
        //     formData.append(i, file)
        //     console.log(formData);
        // });

    }

    onClick = async () => {
        const { file } = this.state;
        let formData = new FormData();

        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        console.log(formData);
        try {
            console.log('file', file);
            const response = await fetch(`http://localhost:8080/cocoon-resort/TestServlet`, {
                method: 'POST',
                headers: new Headers({
                    "content-type": "multipart/form-data; boundary='boundary'"
                }),
                body: { formData }
            });
        } catch (err) {
            throw err;
        }
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