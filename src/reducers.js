export default function(state = {}, action) {

    if (action.type === 'GET_FRIENDS') {
        state = Object.assign({}, state, { friends: action.friends }); //object.assign creates clone of the state
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
        if (state.onlineUsers) {
            state = Object.assign({}, state, {
                onlineUsers: state.onlineUsers.concat(action.user)
            });
        }
    }

    if(action.type === 'USER_LEFT') {
        const newUsers = state.onlineUsers.filter(user => {
            return user.id != action.userId;
        });
        state = Object.assign({}, state, {
            onlineUsers: newUsers
        });
    }

    if(action.type === 'CHATS_MESSAGES') {
        state = Object.assign({}, state, {
            chats: action.messages
        });
    }

    if(action.type === 'SINGLE_CHAT_MESSAGE') {
        state = Object.assign({}, state, {
            chats: state.chats.concat(action.singleChatMessage)
        });
    }

    return state; //to check if you successfully updated the state, console log "state" right before return
}
