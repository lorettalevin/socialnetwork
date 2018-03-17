//CLIENT SIDE

import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic'
import Profile from './profile'
import ProfilePicUpload from './profilepicupload'
import BioUpload from './bioupload'
import Logo from './logo';
import {BrowserRouter, Route} from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: 'https://res.cloudinary.com/closebrace/image/upload/w_400/v1491315007/usericon_id76rb.png',
            showUploader: false,
            showBio: false
        };
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.toggleBio = this.toggleBio.bind(this);
    }
    toggleUploader() {
        this.setState({
            showUploader: !this.state.showUploader
        })
    }
    toggleBio() {
        this.setState({
            showBio: !this.state.showBio
        })
    }
    componentDidMount() {
        axios.get('/user').then(resp => {
            const {id, first, last, email, url, bio} = resp.data;
            this.setState({
                id,
                first,
                last,
                email,
                url: url || this.state.url,
                bio
            })
        }, () => {
            console.log("new state", this.state);
        });
    }
    setImage(url) {
        this.setState({url})
    }
    setBio(bio){
        this.setState({bio})
    }
    render() {
        const {first, last, url, email, bio, showUploader} = this.state
        return (<div>
            <Logo/>
            <p>Welcome {first} at {email}</p>
            <ProfilePic
                first={first}
                last={last}
                url={url}
                toggleUploader={this.toggleUploader}
            />
        { showUploader && <ProfilePicUpload
                setImage={this.setImage}
            /> }

            { this.state.showBio && <BioUpload
                        setBio={this.setBio}
                    /> }
            <BrowserRouter>
                <div>
                    <Route
                        path="/"
                        render={() => (
                            <Profile
                                first={first}
                                last={last}
                                url={url}
                                bio={bio}
                                setBio={this.setBio}
                                toggleBio={this.toggleBio}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>

        </div>)
    }
}
