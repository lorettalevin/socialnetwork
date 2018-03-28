//CLIENT SIDE

import React from 'react';
import axios from './axios';
import OtherProfile from './otherprofile'
import OnlineFriends from './onlinefriends'
import Logo from './logo'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Friends from './friends'
import Chat from './chat'
import Profile from './profile'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: '/images/newdefault.png',
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
        const {first, last, url, email, bio, showUploader, showBio} = this.state
        return (<div>
            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                          <li><Link to="/">Profile</Link></li>
                          <li><Link to="/friends">Friends</Link></li>
                          <li><Link to="/onlinefriends">Online Friends</Link></li>
                          <li><Link to="/chat">Chat</Link></li>
                          <li><a href="/logout">Log Out</a></li>
                        </ul>
                    </nav>
                    <Route
                        path="/"
                        exact
                        render={() => (
                            <Profile
                                first={first}
                                last={last}
                                url={url}
                                bio={bio}
                                setBio={this.setBio}
                                toggleBio={this.toggleBio}
                                setImage={this.setImage}
                                showBio={showBio}
                                toggleUploader={this.toggleUploader}
                                showUploader={showUploader}
                            />
                        )}
                    />
                    <Route exact path="/user/:id" component={OtherProfile} />
                    <Route exact path="/friends" component={Friends} />
                    <Route exact path="/onlinefriends" component={OnlineFriends} />
                    <Route exact path="/chat" component={Chat} />
                </div>
            </BrowserRouter>
        </div>)
    }
}
