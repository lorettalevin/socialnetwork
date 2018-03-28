 import React from 'react';
import {getFriends, acceptFriends, terminateFriends} from './actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        pendingFriends: state.friends && state.friends.filter(friend => friend.status == 1),
        acceptedFriends: state.friends && state.friends.filter(friend => friend.status == 2)
    }
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getFriends())
    }
    render() {
        if (!this.props.pendingFriends) {
            return null
        }
        const pendingFriendsList = this.props.pendingFriends.map((pending, id) => (
            <div key={id}>
                <p>{pending.first} {pending.last}</p>
                <Link to={`/user/${pending.id}`}><img src={pending.url || '/images/newdefault.png'} className="profile-pic" alt="Profile Pic"/></Link>
                <button className="friend-button" onClick={() => {this.props.dispatch(acceptFriends(pending.id))}}>Accept</button>
            </div>
        ))
        const acceptedFriendsList = this.props.acceptedFriends.map((accepted, id) => (
            <div key={id}>
                <p>{accepted.first} {accepted.last}</p>
                <Link to={`/user/${accepted.id}`}><img src={accepted.url || './images/newdefault.png'} className="profile-pic" alt="Profile Pic"/></Link>
                <button className="friend-button" onClick={() => {this.props.dispatch(terminateFriends(accepted.id))}}>Unfriend</button>
            </div>
        ))

        return (<div>
            <div>
                <p className="headline">Friends</p>
                <p>Pending Friends: </p>{pendingFriendsList}
                <p>Accepted Friends: </p>{acceptedFriendsList}
            </div>
        </div>)
    }
}

export default connect(mapStateToProps)(Friends)
