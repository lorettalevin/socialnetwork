import axios from './axios';

export function getFriends() {
    return axios.get('/getfriends').then(resp => {
        return {
            type: 'GET_FRIENDS',
            friends: resp.data.friends
        };
    });
}

export function acceptFriends(recipient_id) {
    return axios.post(`/acceptfriendrequest/${recipient_id}`).then(resp => {
        return {
            type: 'ACCEPT_FRIENDS',
            friends: resp.data.friends,
            id: recipient_id
        };
    });
}

export function terminateFriends(recipient_id) {
    return axios.post(`/terminatefriendship/${recipient_id}`).then(resp => {
        return {
            type: 'TERMINATE_FRIENDS',
            friends: resp.data.friends,
            id: recipient_id
        };
    });
}

//SOCKET IO

export function onlineUsers(users) {
    return {
        type: 'ONLINE_USERS',
        users
    };
}

export function userJoined(user) {
    return {
        type: 'USER_JOINED',
        user
    };
}

export function userLeft(userId) {
    return {
        type: 'USER_LEFT',
        userId
    };
}

export function chats(messages) {
    return {
        type: 'CHATS_MESSAGES',
        messages
    };
}
