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
    return state; //to check if you successfully updated the state, console log "state" right before return
}
