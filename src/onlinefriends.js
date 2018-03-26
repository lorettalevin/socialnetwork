import React from 'react';
import { connect } from 'react-redux';

class OnlineFriends extends React.Component {
    constructor(props) {
        super(props);
        this.renderFriends = this.renderFriends.bind(this)
    }

    renderFriends() {
        if(!this.props.onlineUsers){
            return (<div>Loading...</div>)
        }

        return this.props.onlineUsers.map(user => {
            return (
                <div key={user.id}>
                    <p>{user.first} {user.last}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>OnlineFriends</h1>
                <div>{this.renderFriends()}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        onlineUsers: state.onlineUsers
    }
}

export default connect(mapStateToProps)(OnlineFriends)
