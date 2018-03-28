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
                <p className="profile-pic-uploader">{pending.first} {pending.last}</p>
                <Link to={`/user/${pending.id}`}><img src={pending.url || '/images/newdefault.png'} className="pending-friend-pic"  alt="Profile Pic"/></Link>
                <button className="friend-button" onClick={() => {this.props.dispatch(acceptFriends(pending.id))}}>Accept</button>
            </div>
        ))
        const acceptedFriendsList = this.props.acceptedFriends.map((accepted, id) => (
            <div key={id}>
                <p className="profile-pic-uploader">{accepted.first} {accepted.last}</p>
                <Link to={`/user/${accepted.id}`}><img src={accepted.url || './images/newdefault.png'} className="pending-friend-pic" alt="Profile Pic"/></Link>
                <button className="friend-button" onClick={() => {this.props.dispatch(terminateFriends(accepted.id))}}>Unfriend</button>
            </div>
        ))

        return (
            <div id="friends-page">
                <p className="headline">Friends</p>
                <div id="friends-container">
                    <p className="profile-pic-uploader">Pending Friends: </p>
                    <div className="friends-list">
                        {pendingFriendsList}
                    </div>
                    <p className="profile-pic-uploader">Accepted Friends: </p>
                    <div className="friends-list">
                        {acceptedFriendsList}
                    </div>
                </div>
        </div>)
    }
}

export default connect(mapStateToProps)(Friends)
