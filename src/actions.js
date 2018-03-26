import axios from 'axios';

export function getFriends() {
    return axios.get('/getfriends').then(resp => {
        return {
            type: 'GET_FRIENDS',
            friends: resp.data.friends
        };
    });
}
