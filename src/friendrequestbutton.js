import React from 'react';
import axios from './axios';

export default class FriendRequestButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "Friend",
            status: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderButtonText = this.renderButtonText.bind(this)
    }
    renderButtonText(){
        const {recipient_id, sender_id, status} = this.props
        console.log("recip", recipient_id, "sender", sender_id);
        let text;
        if (status == 0) {
            text = "Friend"
        } else if (status == 1) {  //need to check sender_id
            text = "Reject"
            if (sender_id == this.props.match.params.id) {
                text = "Accept"
            }
        } else if (status == 2) {
            text = "Unfriend"
        } else if (status == 3) {
            text = "Friend"
        } else if (status == 4) {
            text = "Friend"
        } else if (status == 5) {
            text = "Friend"
        }
        return text;
    }

handleSubmit(e) {
    e.preventDefault();
    const {status, updateStatus, sender_id} = this.props
    if (status == 0 || status == 4 || status == 5) {
        axios.post(`/sendfriendrequest/${this.props.match.params.id}`, {status}).then(resp => {
            updateStatus(resp.data.status)
        })
    } else if (status == 1) {
        if (sender_id == this.props.match.params.id) {
            axios.post(`/acceptfriendrequest/${this.props.match.params.id}`).then(resp => {
                updateStatus(resp.data.status)
            })
        } else {
            axios.post(`/cancelfriendrequest/${this.props.match.params.id}`).then(resp => {
                updateStatus(resp.data.status)
            })
        }
    } else if (status == 2) {
        axios.post(`/terminatefriendship/${this.props.match.params.id}`).then(resp => {
            updateStatus(resp.data.status)
        })
    }
}

render(){
        return (
            <div>
                <button onClick={this.handleSubmit}>{this.renderButtonText()}</button>
            </div>
        )
    }
}
