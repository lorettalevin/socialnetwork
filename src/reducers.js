export default function(state = {}, action) {
    if (action.type === 'GET_FRIENDS') {
        state = Object.assign({}, state, { friends: action.friends });
    }
    if (action.type === 'ACCEPT_FRIENDS') {
        state = Object.assign({}, state, {
            friends: state.friends.map(friend => {
                if (friend.id === action.id) {
                    return Object.assign({}, friend, { status: 2 });
                } else {
                    return Object.assign({}, friend);
                }
            })
        });
    }
    if (action.type === 'TERMINATE_FRIENDS') {
        state = Object.assign({}, state, {
            friends: state.friends.map(friend => {
                if (friend.id === action.id) {
                    return Object.assign({}, friend, { status: 4 });
                } else {
                    return Object.assign({}, friend);
                }
            })
        });
    }
    if(action.type === 'ONLINE_USERS') {
        state = Object.assign({}, state, {
            onlineUsers: action.users
        });
    }

    if(action.type === 'USER_JOINED') {
        state = Object.assign({}, state, {

        });
    }

    if(action.type === 'USER_LEFT') {

        const newUsers = state.onlineUsers.filter(user => {
            return user.id != action.userId;
        });

        state = Object.assign({}, state, {
            onlineUsers: newUsers
        });
    }
    return state; //to check if you successfully updated the state, console log "state" right before return
}
