import React from 'react';
import {getFriends} from './actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
    console.log("mapstate", state);
    return {
        pendingFriends: state.friends && state.friends.filter(friend => friend.status == 1),
        acceptedFriends: state.friends && state.friends.filter(friend => friend.status == 2)
        // recipient_id: state.recipient_id
    }
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getFriends())
        // this.props.dispatch(terminateFriendship())
    }
    render() {
        if (!this.props.pendingFriends) {
            return null
        }
        const pendingFriendsList = this.props.pendingFriends.map(pending => (
            <div>
                <h1>{pending.first} {pending.last}</h1>
                <Link to={`/user/${pending.id}`}><img src='{pending.url}' alt="Profile Pic"/></Link>
                <button onClick={this.props.dispatch(acceptedFriendsList)}>Accepted</button>
            </div>
        ))
        const acceptedFriendsList = this.props.acceptedFriends.map(accepted => (
            <div>
                <h1>{accepted.first} {accepted.last}</h1>
                <Link to={`/user/${accepted.id}`}><img src='{accepted.url}' alt="Profile Pic"/></Link>
                <button onClick={this.props.dispatch(pendingFriendsList)}>Unfriend</button>
            </div>
        ))

        return (<div>
            <div>
                <h1>Pending Friends: {pendingFriendsList}</h1>
                <h1>Accepted Friends: {acceptedFriendsList}</h1>
            </div>
        </div>)
    }
}

export default connect(mapStateToProps)(Friends)
