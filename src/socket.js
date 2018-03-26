import * as io from 'socket.io-client';
import { onlineUsers, userJoined, userLeft } from './actions';

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on('onlineUsers', users => store.dispatch(onlineUsers(users)));
        socket.on('userJoined', id => store.dispatch(userJoined(id)));
        socket.on('userLeft', user => store.dispatch(userLeft(user)));
    }
    return socket;
}
