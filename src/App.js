//CLIENT SIDE

import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic'
import ProfilePicUpload from './profilepicupload'
import Logo from './logo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: 'https://res.cloudinary.com/closebrace/image/upload/w_400/v1491315007/usericon_id76rb.png',
            showUploader: false
        };
        this.setImage = this.setImage.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
    }
    toggleUploader() {
        this.setState({
            showUploader: !this.state.showUploader
        })
    }
    componentDidMount() {
        axios.get('/user').then(resp => {
            const {id, first, last, email, url} = resp.data;
            this.setState({
                id,
                first,
                last,
                email,
                url: url || this.state.url
            })
        }, () => {
            console.log("new state", this.state);
        });
    }
    setImage(url) {
        this.setState({url})
    }
    render() {
        const {first, last, url, email} = this.state
        return (<div>
            <Logo/>
            <p>Welcome {this.state.first} at {this.state.email}</p>
            <ProfilePic
                first={first}
                last={last}
                url={url}
                toggleUploader={this.toggleUploader}
            />
        { this.state.showUploader && <ProfilePicUpload
                setImage={this.setImage}
            /> }
        </div>)
    }
}
