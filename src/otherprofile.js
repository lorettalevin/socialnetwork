import React from 'react';
import axios from './axios';
import FriendRequestButton from './friendrequestbutton'

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: './images/default.png',
            bio: 'Default Bio'
        };
        this.updateStatus = this.updateStatus.bind(this)
    }
    componentDidMount() {
        axios.get(`/get-user/${this.props.match.params.id}`).then(resp => {
            if (resp.data.success === false) {
                return this.props.history.push('/')
            } else {
                const {id, first, last, email, url, bio, recipient_id, sender_id, status} = resp.data;
                this.setState({
                    id,
                    first,
                    last,
                    email,
                    url: url || this.state.url,
                    bio: bio || this.state.bio,
                    recipient_id,
                    sender_id,
                    status
                })
            }
        }).catch(err => {
            console.log("There was an error in getUser", err);
        })
    }

    updateStatus(newStatus){
        this.setState({
            status: newStatus
        });
    }

    render(){
        const {id, first, last, email, url, bio, recipient_id, sender_id, status} = this.state
        return(
            <div>
                <p>Hello {first} {last} at {email}!</p>
                <img src={url} alt="Profile Picture"/>
                <p>{bio}</p>
                <FriendRequestButton
                    recipient_id={recipient_id}
                    sender_id={sender_id}
                    status={status}
                    match={this.props.match}
                    updateStatus={this.updateStatus}
                />
            </div>
        )
    }
}
